import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Calculators: React.FC = () => {
    const [selectedCalculator, setSelectedCalculator] = useState('Monthly SIP');
    
    // Common inputs
    const [monthlySip, setMonthlySip] = useState(1000);
    const [rateOfReturn, setRateOfReturn] = useState(8);
    const [years, setYears] = useState(10);
    
    // Lumpsum inputs
    const [lumpsumAmount, setLumpsumAmount] = useState(100000);
    
    // Retirement inputs
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
    const [inflation, setInflation] = useState(6);
    
    // Inflation inputs
    const [currentAmount, setCurrentAmount] = useState(100000);
    const [inflationRate, setInflationRate] = useState(6);
    
    // Goal Calculator inputs
    const [goalAmount, setGoalAmount] = useState(1000000);
    const [currentSavings, setCurrentSavings] = useState(0);
    
    // Become Crorepati inputs
    const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
    
    // Time Value of Money inputs
    const [presentValue, setPresentValue] = useState(100000);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Calculate SIP returns
    const calculateSIP = useMemo(() => {
        const monthlyRate = rateOfReturn / 100 / 12;
        const months = years * 12;
        const totalInvestment = monthlySip * months;
        
        let futureValue = 0;
        if (monthlyRate > 0) {
            futureValue = monthlySip * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        } else {
            futureValue = totalInvestment;
        }
        
        const estimatedReturns = futureValue - totalInvestment;
        
        return {
            totalInvestment: Math.round(totalInvestment),
            totalValue: Math.round(futureValue),
            estimatedReturns: Math.round(estimatedReturns),
        };
    }, [monthlySip, rateOfReturn, years]);

    // Calculate Lumpsum Investment
    const calculateLumpsum = useMemo(() => {
        const annualRate = rateOfReturn / 100;
        const futureValue = lumpsumAmount * Math.pow(1 + annualRate, years);
        const estimatedReturns = futureValue - lumpsumAmount;
        
        return {
            totalInvestment: Math.round(lumpsumAmount),
            totalValue: Math.round(futureValue),
            estimatedReturns: Math.round(estimatedReturns),
        };
    }, [lumpsumAmount, rateOfReturn, years]);

    // Calculate Retirement Corpus
    const calculateRetirement = useMemo(() => {
        const yearsToRetirement = retirementAge - currentAge;
        const annualExpenses = monthlyExpenses * 12;
        const inflationAdjustedExpenses = annualExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
        const corpusNeeded = inflationAdjustedExpenses * 25; // 25 years of expenses
        
        const monthlyRate = rateOfReturn / 100 / 12;
        const months = yearsToRetirement * 12;
        let monthlySipNeeded = 0;
        
        if (monthlyRate > 0) {
            monthlySipNeeded = corpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        } else {
            monthlySipNeeded = corpusNeeded / months;
        }
        
        return {
            totalInvestment: Math.round(monthlySipNeeded * months),
            totalValue: Math.round(corpusNeeded),
            estimatedReturns: Math.round(corpusNeeded - (monthlySipNeeded * months)),
            monthlySipNeeded: Math.round(monthlySipNeeded),
        };
    }, [currentAge, retirementAge, monthlyExpenses, inflation, rateOfReturn]);

    // Calculate Inflation Impact
    const calculateInflation = useMemo(() => {
        const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years);
        const purchasingPower = currentAmount;
        const valueLost = futureValue - purchasingPower;
        
        return {
            totalInvestment: Math.round(currentAmount),
            totalValue: Math.round(futureValue),
            estimatedReturns: Math.round(valueLost),
        };
    }, [currentAmount, inflationRate, years]);

    // Calculate Financial Goal
    const calculateGoal = useMemo(() => {
        const amountNeeded = goalAmount - currentSavings;
        const monthlyRate = rateOfReturn / 100 / 12;
        const months = years * 12;
        let monthlySipNeeded = 0;
        
        if (monthlyRate > 0) {
            monthlySipNeeded = amountNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        } else {
            monthlySipNeeded = amountNeeded / months;
        }
        
        const totalInvestment = monthlySipNeeded * months;
        const futureValue = goalAmount;
        const estimatedReturns = futureValue - totalInvestment - currentSavings;
        
        return {
            totalInvestment: Math.round(totalInvestment + currentSavings),
            totalValue: Math.round(futureValue),
            estimatedReturns: Math.round(estimatedReturns),
            monthlySipNeeded: Math.round(monthlySipNeeded),
        };
    }, [goalAmount, currentSavings, rateOfReturn, years]);

    // Calculate Become a Crorepati
    const calculateCrorepati = useMemo(() => {
        const targetAmount = 10000000; // 1 Crore
        const monthlyRate = rateOfReturn / 100 / 12;
        let monthsNeeded = 0;
        
        if (monthlyRate > 0) {
            // Solve for n: 10000000 = monthlyInvestment * [((1 + r)^n - 1) / r] * (1 + r)
            let n = 0;
            let fv = 0;
            while (fv < targetAmount && n < 600) {
                n++;
                fv = monthlyInvestment * (((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate));
            }
            monthsNeeded = n;
        } else {
            monthsNeeded = targetAmount / monthlyInvestment;
        }
        
        const yearsNeeded = monthsNeeded / 12;
        const totalInvestment = monthlyInvestment * monthsNeeded;
        const estimatedReturns = targetAmount - totalInvestment;
        
        return {
            totalInvestment: Math.round(totalInvestment),
            totalValue: Math.round(targetAmount),
            estimatedReturns: Math.round(estimatedReturns),
            yearsNeeded: Math.round(yearsNeeded * 10) / 10,
        };
    }, [monthlyInvestment, rateOfReturn]);

    // Calculate Time Value of Money
    const calculateTimeValue = useMemo(() => {
        if (presentValue > 0 && years > 0) {
            const annualRate = rateOfReturn / 100;
            const calculatedFV = presentValue * Math.pow(1 + annualRate, years);
            const estimatedReturns = calculatedFV - presentValue;
            
            return {
                totalInvestment: Math.round(presentValue),
                totalValue: Math.round(calculatedFV),
                estimatedReturns: Math.round(estimatedReturns),
            };
        }
        return {
            totalInvestment: 0,
            totalValue: 0,
            estimatedReturns: 0,
        };
    }, [presentValue, rateOfReturn, years]);

    // Calculate Goal Planner (similar to Financial Goal)
    const calculateGoalPlanner = useMemo(() => {
        return calculateGoal;
    }, [calculateGoal]);

    // Get current calculation result based on selected calculator
    const currentCalculation = useMemo(() => {
        switch (selectedCalculator) {
            case 'Monthly SIP':
                return calculateSIP;
            case 'Lumpsum Investment':
                return calculateLumpsum;
            case 'Retirement Corpus':
                return calculateRetirement;
            case 'Inflation Calculator':
                return calculateInflation;
            case 'Financial Goal Calculator':
                return calculateGoal;
            case 'Become a Crorepati':
                return calculateCrorepati;
            case 'Time Value of Money':
                return calculateTimeValue;
            case 'Goal Planner':
                return calculateGoalPlanner;
            default:
                return calculateSIP;
        }
    }, [selectedCalculator, calculateSIP, calculateLumpsum, calculateRetirement, calculateInflation, calculateGoal, calculateCrorepati, calculateTimeValue, calculateGoalPlanner]);

    const calculatorList = [
        'Monthly SIP',
        'Lumpsum Investment',
        'Retirement Corpus',
        'Inflation Calculator',
        'Financial Goal Calculator',
        'Become a Crorepati',
        'Time Value of Money',
        'Goal Planner',
    ];

    // Format number with Indian numbering system
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate pie chart percentages
    const investedPercentage = currentCalculation.totalValue > 0 
        ? (currentCalculation.totalInvestment / currentCalculation.totalValue) * 100 
        : 0;
    const returnsPercentage = currentCalculation.totalValue > 0 
        ? (currentCalculation.estimatedReturns / currentCalculation.totalValue) * 100 
        : 0;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-16 md:pt-24 overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Breadcrumbs */}
                        <div className="mb-6">
                            <nav className="flex items-center space-x-2 text-sm">
                                <Link to="/" className="text-primary hover:text-primary-dark transition-colors">
                                    Home
                                </Link>
                                <span className="text-neutral-400">/</span>
                                <span className="text-neutral-500">Calculators</span>
                            </nav>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#243062] mb-4 leading-tight">
                            Financial Calculators
                        </h1>

                        <p className="text-base md:text-lg text-neutral-600 mb-8 leading-relaxed">
                            Make informed financial decisions with our comprehensive suite of calculators. Plan your investments, calculate returns, and achieve your financial goals with ease.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="relative py-8 md:py-12 bg-neutral-50">
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Calculator Content */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#243062] mb-8">
                                        {selectedCalculator}
                                    </h2>

                                    {/* Input Fields with Sliders */}
                                    <div className="space-y-8 mb-8">
                                        {/* Monthly SIP */}
                                        {selectedCalculator === 'Monthly SIP' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Monthly SIP Value in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(monthlySip)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="500"
                                                        max="100000"
                                                        step="500"
                                                        value={monthlySip}
                                                        onChange={(e) => setMonthlySip(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((monthlySip - 500) / (100000 - 500)) * 100}%, #E5E7EB ${((monthlySip - 500) / (100000 - 500)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>500</span>
                                                        <span>1,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Rate of Return in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="20"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1%</span>
                                                        <span>20%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            No. of Years
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="50"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>50</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Lumpsum Investment */}
                                        {selectedCalculator === 'Lumpsum Investment' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Investment Amount in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(lumpsumAmount)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="10000"
                                                        max="10000000"
                                                        step="10000"
                                                        value={lumpsumAmount}
                                                        onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((lumpsumAmount - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB ${((lumpsumAmount - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>10,000</span>
                                                        <span>1,00,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Rate of Return in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="20"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1%</span>
                                                        <span>20%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            No. of Years
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="50"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>50</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Retirement Corpus */}
                                        {selectedCalculator === 'Retirement Corpus' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Current Age
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {currentAge} years
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="20"
                                                        max="60"
                                                        step="1"
                                                        value={currentAge}
                                                        onChange={(e) => setCurrentAge(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((currentAge - 20) / (60 - 20)) * 100}%, #E5E7EB ${((currentAge - 20) / (60 - 20)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>20</span>
                                                        <span>60</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Retirement Age
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {retirementAge} years
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="50"
                                                        max="70"
                                                        step="1"
                                                        value={retirementAge}
                                                        onChange={(e) => setRetirementAge(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((retirementAge - 50) / (70 - 50)) * 100}%, #E5E7EB ${((retirementAge - 50) / (70 - 50)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>50</span>
                                                        <span>70</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Monthly Expenses in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(monthlyExpenses)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="10000"
                                                        max="500000"
                                                        step="5000"
                                                        value={monthlyExpenses}
                                                        onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((monthlyExpenses - 10000) / (500000 - 10000)) * 100}%, #E5E7EB ${((monthlyExpenses - 10000) / (500000 - 10000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>10,000</span>
                                                        <span>5,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Expected Inflation in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {inflation}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="3"
                                                        max="10"
                                                        step="0.5"
                                                        value={inflation}
                                                        onChange={(e) => setInflation(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((inflation - 3) / (10 - 3)) * 100}%, #E5E7EB ${((inflation - 3) / (10 - 3)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>3%</span>
                                                        <span>10%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Expected Returns in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="6"
                                                        max="15"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>6%</span>
                                                        <span>15%</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Inflation Calculator */}
                                        {selectedCalculator === 'Inflation Calculator' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Current Amount in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(currentAmount)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="10000"
                                                        max="10000000"
                                                        step="10000"
                                                        value={currentAmount}
                                                        onChange={(e) => setCurrentAmount(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((currentAmount - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB ${((currentAmount - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>10,000</span>
                                                        <span>1,00,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Inflation Rate in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {inflationRate}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="3"
                                                        max="10"
                                                        step="0.5"
                                                        value={inflationRate}
                                                        onChange={(e) => setInflationRate(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((inflationRate - 3) / (10 - 3)) * 100}%, #E5E7EB ${((inflationRate - 3) / (10 - 3)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>3%</span>
                                                        <span>10%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            No. of Years
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="50"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>50</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Financial Goal Calculator */}
                                        {selectedCalculator === 'Financial Goal Calculator' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Goal Amount in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(goalAmount)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="100000"
                                                        max="10000000"
                                                        step="50000"
                                                        value={goalAmount}
                                                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((goalAmount - 100000) / (10000000 - 100000)) * 100}%, #E5E7EB ${((goalAmount - 100000) / (10000000 - 100000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1,00,000</span>
                                                        <span>1,00,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Current Savings in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(currentSavings)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="5000000"
                                                        step="10000"
                                                        value={currentSavings}
                                                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((currentSavings - 0) / (5000000 - 0)) * 100}%, #E5E7EB ${((currentSavings - 0) / (5000000 - 0)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>0</span>
                                                        <span>50,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Expected Returns in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="6"
                                                        max="15"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>6%</span>
                                                        <span>15%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Time to Achieve Goal (Years)
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="30"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (30 - 1)) * 100}%, #E5E7EB ${((years - 1) / (30 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>30</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Become a Crorepati */}
                                        {selectedCalculator === 'Become a Crorepati' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Monthly Investment in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(monthlyInvestment)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="5000"
                                                        max="100000"
                                                        step="1000"
                                                        value={monthlyInvestment}
                                                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((monthlyInvestment - 5000) / (100000 - 5000)) * 100}%, #E5E7EB ${((monthlyInvestment - 5000) / (100000 - 5000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>5,000</span>
                                                        <span>1,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Expected Returns in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="8"
                                                        max="15"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 8) / (15 - 8)) * 100}%, #E5E7EB ${((rateOfReturn - 8) / (15 - 8)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>8%</span>
                                                        <span>15%</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Time Value of Money */}
                                        {selectedCalculator === 'Time Value of Money' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Present Value in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(presentValue)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="10000"
                                                        max="10000000"
                                                        step="10000"
                                                        value={presentValue}
                                                        onChange={(e) => setPresentValue(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((presentValue - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB ${((presentValue - 10000) / (10000000 - 10000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>10,000</span>
                                                        <span>1,00,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Rate of Return in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="20"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB ${((rateOfReturn - 1) / (20 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1%</span>
                                                        <span>20%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            No. of Years
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="50"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB ${((years - 1) / (50 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>50</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {/* Goal Planner */}
                                        {selectedCalculator === 'Goal Planner' && (
                                            <>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Goal Amount in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(goalAmount)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="100000"
                                                        max="10000000"
                                                        step="50000"
                                                        value={goalAmount}
                                                        onChange={(e) => setGoalAmount(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((goalAmount - 100000) / (10000000 - 100000)) * 100}%, #E5E7EB ${((goalAmount - 100000) / (10000000 - 100000)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1,00,000</span>
                                                        <span>1,00,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Current Savings in ₹
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {formatCurrency(currentSavings)}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="5000000"
                                                        step="10000"
                                                        value={currentSavings}
                                                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((currentSavings - 0) / (5000000 - 0)) * 100}%, #E5E7EB ${((currentSavings - 0) / (5000000 - 0)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>0</span>
                                                        <span>50,00,000</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Expected Returns in %
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {rateOfReturn}%
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="6"
                                                        max="15"
                                                        step="0.5"
                                                        value={rateOfReturn}
                                                        onChange={(e) => setRateOfReturn(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB ${((rateOfReturn - 6) / (15 - 6)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>6%</span>
                                                        <span>15%</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between items-center mb-3">
                                                        <label className="text-base md:text-lg font-semibold text-[#243062]">
                                                            Time to Achieve Goal (Years)
                                                        </label>
                                                        <span className="text-lg font-bold text-primary">
                                                            {years}
                                                        </span>
                                                    </div>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="30"
                                                        step="1"
                                                        value={years}
                                                        onChange={(e) => setYears(Number(e.target.value))}
                                                        className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                                        style={{
                                                            background: `linear-gradient(to right, #DC2626 0%, #DC2626 ${((years - 1) / (30 - 1)) * 100}%, #E5E7EB ${((years - 1) / (30 - 1)) * 100}%, #E5E7EB 100%)`,
                                                        }}
                                                    />
                                                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                                                        <span>1</span>
                                                        <span>30</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Output Fields and Pie Chart */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Output Fields */}
                                        <div className="space-y-6">
                                            {selectedCalculator === 'Retirement Corpus' && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Retirement Corpus Needed in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Monthly SIP Required in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency((currentCalculation as any).monthlySipNeeded || 0)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Investment in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            {selectedCalculator === 'Financial Goal Calculator' && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Monthly SIP Required in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency((currentCalculation as any).monthlySipNeeded || 0)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Investment in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Goal Amount in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            {selectedCalculator === 'Become a Crorepati' && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Target Amount in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Years Required</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {(currentCalculation as any).yearsNeeded || 0} years
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Investment in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            {selectedCalculator === 'Inflation Calculator' && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Current Value in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Future Value in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Value Lost to Inflation in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.estimatedReturns)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            {!['Retirement Corpus', 'Financial Goal Calculator', 'Become a Crorepati', 'Inflation Calculator', 'Goal Planner'].includes(selectedCalculator) && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Investment in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Value in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Est. Returns in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.estimatedReturns)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                            {selectedCalculator === 'Goal Planner' && (
                                                <>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Monthly SIP Required in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency((currentCalculation as any).monthlySipNeeded || 0)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Total Investment in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalInvestment)}
                                                        </p>
                                                    </div>
                                                    <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                                        <p className="text-sm text-neutral-600 mb-2">Goal Amount in ₹</p>
                                                        <p className="text-2xl font-bold text-[#243062]">
                                                            {formatCurrency(currentCalculation.totalValue)}
                                                        </p>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Pie Chart */}
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="mb-4 flex gap-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                                    <span className="text-sm font-medium text-neutral-700">Invested Amount</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                                    <span className="text-sm font-medium text-neutral-700">Est. Returns</span>
                                                </div>
                                            </div>
                                            <div className="relative w-64 h-64">
                                                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                                    {/* Invested Amount (Blue) */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke="#3B82F6"
                                                        strokeWidth="20"
                                                        strokeDasharray={`${investedPercentage * 2.513} 251.3`}
                                                        className="transition-all duration-300"
                                                    />
                                                    {/* Estimated Returns (Red) */}
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke="#DC2626"
                                                        strokeWidth="20"
                                                        strokeDasharray={`${returnsPercentage * 2.513} 251.3`}
                                                        strokeDashoffset={`-${investedPercentage * 2.513}`}
                                                        className="transition-all duration-300"
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-center">
                                                        <p className="text-xs text-neutral-600">Total Value</p>
                                                        <p className="text-lg font-bold text-[#243062]">
                                                            ₹{formatCurrency(currentCalculation.totalValue).slice(0, -3)}K
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calculator Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                                    <h3 className="text-lg font-bold text-[#243062] mb-6">Calculators</h3>
                                    <div className="space-y-2">
                                        {calculatorList.map((calc, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedCalculator(calc)}
                                                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                                                    selectedCalculator === calc
                                                        ? 'bg-primary text-white font-semibold'
                                                        : 'text-neutral-700 hover:bg-neutral-100'
                                                }`}
                                            >
                                                {calc}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Retirement Planning Calculator Content Section */}
            <section className="relative py-12 md:py-16 bg-white">
                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Main Heading */}
                        <h2 className="text-3xl md:text-4xl font-bold text-[#243062] mb-6 text-center">
                            Retirement Planning Calculator - Plan your Retirement Today
                        </h2>

                        {/* Introduction */}
                        <div className="mb-12">
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                Do you desire a hassle-free and peaceful life as a retiree? No one and nothing can spoil your peace when you have managed your finances at the right time. Retirement planning is important from a very early age. Moreover, early planning enables you to accumulate the corpus. But, how do you calculate the amount to be saved for years after your retirement? To make the best decision, you need to go through some calculations which is why you should use a Retirement Planning Calculator online.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                A personalized retirement plan will let you maintain your lifestyle without any compromise.
                            </p>
                        </div>

                        {/* Make your Complicated Calculations Easy */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                Make your Complicated Calculations Easy
                            </h3>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                Retirement Planning Calculator is a user-friendly digital tool intended to calculate accurately the required retirement corpus. This versatile calculator will let you identify the potential value of your present expenditures. Using the calculator, you will learn about the amount needed to grow wealth before your retirement. Based on the calculated amount, you can make your decision.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                However, to use the calculator, you have to know the target date of retirement. The calculator needs inputs like expenses, inflation, retirement age, life expectancy, anticipated returns, and your present investment portfolio size. You can draw a financial map in front of you. You may convert your assumptions into projections. The rate of pre-retirement and post-retirement investments is also relevant to your calculations.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                When the calculator shows the output, you will know how much you will need to save every month to get funds after retirement.
                            </p>
                        </div>

                        {/* Benefits of Using the Retirement Calculator */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                Benefits of Using the Retirement Calculator
                            </h3>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                The Rupee inflation calculator will reveal the value of the amount of money after a given period of time. Moreover, it also tells you about the potential worth of the money while investing. Smart investors like to use the inflation calculator because:
                            </p>
                            <div className="space-y-4">
                                <div className="bg-neutral-50 rounded-lg p-6 border-l-4 border-primary">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Ensure financial clarity</h4>
                                    <p className="text-base text-neutral-700">
                                        You may have already created your retirement plan. Still, you can use the calculator to have clarity in your calculation. After entering the relevant details into the calculator, you will know the monthly amount you will earn after retirement.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border-l-4 border-primary">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Manage your finances effectively</h4>
                                    <p className="text-base text-neutral-700">
                                        The major role of the retirement savings calculator is to identify the amount you need to invest for saving up for retirement. You may take the right initiative to secure your finance in the future.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border-l-4 border-primary">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Compare different options</h4>
                                    <p className="text-base text-neutral-700">
                                        You may use the digital calculator to learn about what type of retirement corpus will be advantageous for you. It will be easy to choose retirement schemes for your financial needs.
                                    </p>
                                </div>
                                <div className="bg-neutral-50 rounded-lg p-6 border-l-4 border-primary">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Saves you time</h4>
                                    <p className="text-base text-neutral-700">
                                        It is very time-consuming to do the manual calculations for retirement. The calculator will do it in seconds.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* How Will you use the Retirement Planning Calculator? */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                How Will you use the Retirement Planning Calculator?
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-semibold text-[#243062] mb-3">Enter your age</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        It is the most crucial factor in your investment planning. The retirement fund will be different for every person. For instance, you may have started saving your money for retirement at the age of 30. However, an investor whose investment starts at 45 will have a less aggressive investment portfolio. Based on your age, the corpus will be calculated.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#243062] mb-3">Submit details of your retirement age</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        It is the age when you will retire from your job. The gap between your present age and the retirement age will enable you to calculate the period to build your retirement corpus. In most cases, investors get retired at the age of 60.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#243062] mb-3">Age of making the retirement plan</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        It is the biggest mistake made by several investors. They overlook the factor, like the lifespan after their retirement. You might have anticipated that your lifespan would be 80. If you anticipate a longer lifespan, you have to make a higher investment.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-[#243062] mb-3">Enter the amount you need every month</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        Your current lifestyle will help you to know how much you need every month after retirement. Due to the reduced purchasing power and inflation, your lifestyle may be costlier. You will need to identify the future value of your cost of living. You may need to spend money for-
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 ml-4">
                                        <li><strong>Monthly rent</strong> - It is relevant to those living in rented houses.</li>
                                        <li><strong>Household needs</strong> - It includes electricity, water, personal care, and groceries.</li>
                                        <li><strong>Dining and shopping</strong> - You need money to buy garments, furniture, and electronic appliances.</li>
                                        <li><strong>Vacation</strong> - You have a dream of traveling to remote places.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Why do Smart Investors Give Importance to Retirement Planning? */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                Why do Smart Investors Give Importance to Retirement Planning?
                            </h3>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                You may have enjoyed a comfortable life since the day you started earning. However, at the age of retirement, you need to quit your job. Still, you like to receive an amount consistently every month. Not everyone gets a pension after retirement. That is why retirement planning will give you the opportunity to avoid financial issues at an old age.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                                Some personal qualities affecting your retirement corpus:
                            </p>
                            <div className="space-y-4">
                                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Procrastination</h4>
                                    <p className="text-base text-neutral-700">
                                        Due to procrastination, you may lose the TVM (Time Value of Money). Try to be an early investor, although the monthly invested amount may be small. Save more and invest more. You will be able to grow your wealth.
                                    </p>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Ignorance and overconfidence</h4>
                                    <p className="text-base text-neutral-700">
                                        Never underestimate the importance of saving taxes, inflation, your health, and your capabilities of managing your financial goals. These things are not related to each other. But they will affect you adversely. Inflation will negatively affect the value of your money. The earlier initiative will make your financial goals easier. Similarly, by saving your taxes, you will find a positive effect on the retirement corpus.
                                    </p>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Constant tracking</h4>
                                    <p className="text-base text-neutral-700">
                                        As you have learned about the need for investment, you may have identified the investment schemes and the amount to be invested. You must track your investments regularly. By tracking investments, you may keep your finances under control.
                                    </p>
                                </div>
                                <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-2">Making investment alone</h4>
                                    <p className="text-base text-neutral-700">
                                        You have a family, and your financial decisions affect your dear ones. Thus, do not deal with investments alone. You can talk to your spouse to discuss medical costs, household budgets, and travel costs. Together, you will be able to make the right decision. Thus, nurture positive habits and make your investments successful.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Frequently Asked Questions (FAQs) */}
                        <div className="mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-[#243062] mb-6">
                                Frequently Asked Questions (FAQs)
                            </h3>
                            <div className="space-y-6">
                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">1. How to Calculate the Retirement Corpus?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        Investing in a good retirement scheme is a good decision. The retirement corpus will be available to you at maturity. The retirement corpus will be useful for managing costs in your daily life. To calculate the corpus accurately, you have to go through some steps.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        <strong>Make some assumptions:</strong>
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        You need to assume some major factors, such as:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 ml-4 mb-3">
                                        <li>The rate of returns</li>
                                        <li>The age of retirement</li>
                                        <li>The inflation rate</li>
                                    </ul>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        After making these assumptions, you may calculate how many years you have to wait for retirement.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        For instance:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 ml-4 mb-3">
                                        <li>Your present age is 40</li>
                                        <li>Life expectancy- 80</li>
                                        <li>Your retirement age- 60</li>
                                        <li>The number of years left for retirement- 20</li>
                                        <li>Years left after retirement- 20</li>
                                        <li>Rate of return- 14%</li>
                                        <li>The rate of inflation- 7%</li>
                                        <li>The return rate after retirement- 8%</li>
                                        <li>Inflation-adjusted returns- 0.93%</li>
                                    </ul>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        <strong>Calculate the amount you need after retirement:</strong> You have to decide on the retirement corpus and find the amount you will need every year after retirement. Evaluate this amount based on how much you spend annually.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        <strong>Find the retirement corpus:</strong> The retirement corpus calculation is now easy for you. To serve your financial needs in the future, this retirement corpus will be essential.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        To avoid these intricate steps, you can use the retirement corpus calculator. The precise calculation will save you effort.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">2. Why Does the Calculator ask for the Desired Monthly Earnings After Retirement?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        The online retirement calculator calculates the amount you will require for retirement. You have invested an amount in order to get a good return and maintain your current lifestyle. You need to enter the amount you desire every month in your retirement years. The calculator will show the retirement corpus, and you can make the best decision.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">3. How Much Money do you Need to Retire Comfortably?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        During your long-term investment, you must focus on your goal. Successful investors in retirement schemes always have considered inflation. They have found it easier to achieve their goals.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        However, it may not be easy to calculate the accurate amount you need after your retirement. According to investment specialists, the best way to decide on financial needs during the post-retirement period is to identify your monthly needs.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        You must also assume the inflation rate to calculate the sum rightly.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        Moreover, the retirement amount for middle-class and lower-middle-class persons will be different. On average, the monthly funds may be Rs. 45,000 to Rs. 50,000.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">4. What is a Good Monthly Retirement Income?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        We cannot mention a particular amount as the right monthly retirement income. Every individual has different needs. While some of us like to use Retirement Funds for daily essentials, others need money for several purposes (such as traveling and healthcare). Moreover, the number of members in your family is another factor making a difference.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">5. What are Some of the Most Recommended Investment Avenues?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed mb-3">
                                        There are several investment options available for Indians. The most common ones are-
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-base text-neutral-700 ml-4">
                                        <li>Fixed Deposits in banks</li>
                                        <li>Mutual Funds</li>
                                        <li>Post Office Savings</li>
                                        <li>Direct Equity</li>
                                        <li>Bonds</li>
                                        <li>Liquid Funds</li>
                                        <li>National Pension Scheme</li>
                                        <li>Public Provident Funds</li>
                                        <li>Senior Citizen Savings Scheme</li>
                                    </ul>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        These are short-term and long-term investment options. You can choose more than one avenue to diversify your portfolio and enjoy higher returns. You have to learn about the pros and cons of every option to make your decision.
                                    </p>
                                </div>

                                <div className="bg-neutral-50 rounded-lg p-6 border border-neutral-200">
                                    <h4 className="text-lg font-semibold text-[#243062] mb-3">6. I Work in a Privately Owned Company. Should I have a Private Retirement Plan?</h4>
                                    <p className="text-base text-neutral-700 leading-relaxed">
                                        Companies in public sectors provide pensions after the retirement of their employees. Some private companies also have retirement plans for their employees. You can check the details of your company's retirement schemes. Still, it is better to make a retirement plan on your own by making proper investments.
                                    </p>
                                    <p className="text-base text-neutral-700 leading-relaxed mt-3">
                                        You will have no financial issues in the future. Financial stress can cause several health disorders. Also, you may lose the enjoyment in life. That is why you have to think of a private retirement plan as a private company's employee. With the right initiative, early retirement will not be scary to you.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Conclusion */}
                        
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative p-8 bg-gradient-to-r from-primary/10 to-primary-dark/10">
                <div >
                            <h3 className="text-2xl md:text-3xl text-center  font-bold text-[#243062] mb-6">
                                Conclusion
                            </h3>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-4">
                                Have you now understood retirement planning and the importance of calculating the retirement corpus? You can now visit Nivesh to get the retirement corpus calculator. The user-friendly calculator will save you time. Moreover, by learning about the retirement corpus, you can rebalance and diversify your assets.
                            </p>
                            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                                However, never delay in making your retirement plan. It is one of the vital steps to keep your future secure and remove concerns about your family members. Some investors make the investment schemes messy and unstructured. Also, they are highly confused about their financial goals. You must avoid these mistakes and stay disciplined. Nivesh can provide you with several investment schemes. Clarity is vital in your financial life, and you must ensure it to keep away from any potential issues.
                            </p>
                        </div>
            </section>
        </div>
    );
};

export default Calculators;

