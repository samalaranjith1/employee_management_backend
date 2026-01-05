const router = require('express').Router();
const SalaryStructure = require('../models/hr/SalaryStructure');
const Payslip = require('../models/hr/Payslip');
const Employee = require('../models/Employee');
const verify = require('../middleware/auth');

// --- SALARY STRUCTURE ---

// Get Salary Structure (Admin gets by employeeId param, Employee gets own)
router.get('/structure/:employeeId', verify, async (req, res) => {
    try {
        const structure = await SalaryStructure.findOne({ employee: req.params.employeeId });
        res.json(structure || {});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Create/Update Salary Structure
router.post('/structure', verify, async (req, res) => {
    try {
        const { employeeId, basic, hra, da, specialAllowance, pf, tax } = req.body;

        let structure = await SalaryStructure.findOne({ employee: employeeId });

        if (!structure) {
            structure = new SalaryStructure({ employee: employeeId });
        }

        // Update fields
        structure.basic = basic;
        structure.hra = hra;
        structure.da = da;
        structure.specialAllowance = specialAllowance;
        structure.pf = pf;
        structure.tax = tax;

        // Calculate Totals manually (since pre-save hook is disabled/problematic)
        structure.grossSalary = (basic || 0) + (hra || 0) + (da || 0) + (specialAllowance || 0);
        structure.netSalary = structure.grossSalary - ((pf || 0) + (tax || 0));

        await structure.save();
        res.json(structure);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- PAYSLIPS ---

// Generate Payslip (Manual Trigger)
router.post('/generate', verify, async (req, res) => {
    try {
        const { employeeId, month, year, lossOfPay } = req.body;

        const structure = await SalaryStructure.findOne({ employee: employeeId });
        if (!structure) {
            return res.status(400).json({ message: 'Salary structure not defined for this employee' });
        }

        // Check if payslip already exists
        const existing = await Payslip.findOne({ employee: employeeId, month, year });
        if (existing) {
            return res.status(400).json({ message: 'Payslip already exists for this period' });
        }

        // Calculations
        const gross = structure.basic + structure.hra + structure.da + structure.specialAllowance;
        const totalDeductions = structure.pf + structure.tax + (lossOfPay || 0);
        const netPay = gross - totalDeductions;

        const payslip = new Payslip({
            employee: employeeId,
            month,
            year,
            basic: structure.basic,
            hra: structure.hra,
            da: structure.da,
            specialAllowance: structure.specialAllowance,
            lossOfPay: lossOfPay || 0,
            totalEarnings: gross,
            totalDeductions: totalDeductions,
            netPay: netPay,
            status: 'Draft'
        });

        await payslip.save();
        res.json(payslip);

    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// Get My Payslips
router.get('/my-payslips', verify, async (req, res) => {
    try {
        const payslips = await Payslip.find({ employee: req.user._id }).sort({ year: -1, month: -1 });
        res.json(payslips);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get All Payslips (For Admin) - filtered by month/year optionally
router.get('/all', verify, async (req, res) => {
    try {
        const { month, year } = req.query;
        let query = {};
        if (month) query.month = month;
        if (year) query.year = year;

        const payslips = await Payslip.find(query).populate('employee', 'fullName employeeId');
        res.json(payslips);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update Payslip Status (e.g., Publish)
router.put('/:id/status', verify, async (req, res) => {
    try {
        const { status } = req.body;
        const payslip = await Payslip.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(payslip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
