'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, IndianRupee, PieChart, Info, TrendingUp, Briefcase } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ToolsSection() {
  // GST State
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState(false);

  // Income Tax State
  const [income, setIncome] = useState<number>(800000);
  
  // TDS State
  const [tdsAmount, setTdsAmount] = useState<number>(50000);
  const [tdsType, setTdsType] = useState<string>('194J');

  // GST Calculation
  const calculateGST = () => {
    if (isInclusive) {
      const base = gstAmount / (1 + gstRate / 100);
      return { base: base.toFixed(2), gst: (gstAmount - base).toFixed(2), total: gstAmount.toFixed(2) };
    } else {
      const gst = (gstAmount * gstRate) / 100;
      return { base: gstAmount.toFixed(2), gst: gst.toFixed(2), total: (gstAmount + gst).toFixed(2) };
    }
  };

  const gstResult = calculateGST();

  // Income Tax Calculation (Simplified FY 2024-25 Estimates)
  const calculateIT = () => {
    // Standard Deductions
    const stdDedNew = 75000;
    const stdDedOld = 50000;

    const taxableNew = Math.max(0, income - stdDedNew);
    const taxableOld = Math.max(0, income - stdDedOld);

    // New Regime Slab FY 2024-25 (Simplified)
    let taxNew = 0;
    if (taxableNew <= 700000) taxNew = 0; // Rebate
    else {
      if (taxableNew > 1500000) taxNew += (taxableNew - 1500000) * 0.3 + 150000;
      else if (taxableNew > 1200000) taxNew += (taxableNew - 1200000) * 0.2 + 90000;
      else if (taxableNew > 900000) taxNew += (taxableNew - 900000) * 0.15 + 45000;
      else if (taxableNew > 600000) taxNew += (taxableNew - 600000) * 0.1 + 15000;
      else if (taxableNew > 300000) taxNew += (taxableNew - 300000) * 0.05;
    }

    // Old Regime Slab (Simplified)
    let taxOld = 0;
    if (taxableOld <= 500000) taxOld = 0; // Rebate
    else {
      if (taxableOld > 1000000) taxOld += (taxableOld - 1000000) * 0.3 + 112500;
      else if (taxableOld > 500000) taxOld += (taxableOld - 500000) * 0.2 + 12500;
      else taxOld += (taxableOld - 250000) * 0.05;
    }

    return { 
      newRegime: taxNew.toFixed(0), 
      oldRegime: taxOld.toFixed(0),
      savings: Math.max(0, Number(taxOld) - taxNew).toFixed(0)
    };
  };

  const itResult = calculateIT();

  // TDS Calculation
  const tdsRates: Record<string, { rate: number, label: string }> = {
    '194J': { rate: 10, label: 'Professional Fees' },
    '194C': { rate: 2, label: 'Contractor (Co)' },
    '194C_I': { rate: 1, label: 'Contractor (Ind)' },
    '194H': { rate: 5, label: 'Commission/Brokerage' },
    '194I': { rate: 10, label: 'Rent (Building)' },
  };

  const calculateTDS = () => {
    const rate = tdsRates[tdsType].rate;
    const deduction = (tdsAmount * rate) / 100;
    return { deduction: deduction.toFixed(2), net: (tdsAmount - deduction).toFixed(2) };
  };

  const tdsResult = calculateTDS();

  return (
    <section id="tools" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Compliance <span className="liquid-text">Toolkit</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Interactive financial tools designed for precise business planning and rapid estimates.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="gst" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 h-16 p-2 rounded-2xl glass border-slate-200">
              <TabsTrigger value="gst" className="rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs">GST Calculator</TabsTrigger>
              <TabsTrigger value="it" className="rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs">IT Estimator</TabsTrigger>
              <TabsTrigger value="tds" className="rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs">TDS Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="gst">
              <Card className="rounded-[2.5rem] glass border-white/60 overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2">
                  <div className="p-10 space-y-8 bg-white/50">
                    <div className="space-y-4">
                      <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Transaction Amount (₹)</Label>
                      <Input 
                        type="number" 
                        value={gstAmount} 
                        onChange={(e) => setGstAmount(Number(e.target.value))} 
                        className="h-14 rounded-xl glass border-slate-200 text-lg font-bold"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">GST Rate (%)</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {[5, 12, 18, 28].map(rate => (
                          <Button 
                            key={rate} 
                            variant={gstRate === rate ? 'default' : 'outline'}
                            onClick={() => setGstRate(rate)}
                            className="rounded-xl h-12 font-bold"
                          >
                            {rate}%
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant={!isInclusive ? 'default' : 'outline'} 
                        onClick={() => setIsInclusive(false)}
                        className="flex-1 rounded-xl h-12 font-bold"
                      >
                        Exclusive
                      </Button>
                      <Button 
                        variant={isInclusive ? 'default' : 'outline'} 
                        onClick={() => setIsInclusive(true)}
                        className="flex-1 rounded-xl h-12 font-bold"
                      >
                        Inclusive
                      </Button>
                    </div>
                  </div>

                  <div className="p-10 bg-primary text-white space-y-8">
                    <div className="flex items-center gap-3">
                        <PieChart className="h-6 w-6" />
                        <h3 className="text-xl font-black uppercase tracking-tighter">GST Breakdown</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/20">
                        <span className="font-bold text-white/70">Net / Base Amount</span>
                        <span className="text-2xl font-black">₹{gstResult.base}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/20">
                        <span className="font-bold text-white/70">GST ({gstRate}%)</span>
                        <span className="text-2xl font-black">₹{gstResult.gst}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="font-black text-lg uppercase">Total Amount</span>
                        <span className="text-4xl font-black">₹{gstResult.total}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl flex gap-3 text-xs leading-relaxed">
                        <Info className="h-4 w-4 shrink-0" />
                        Professional tip: GST inclusive calculations are typically used for B2C retail prices.
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="it">
              <Card className="rounded-[2.5rem] glass border-white/60 overflow-hidden shadow-2xl p-10">
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div className="space-y-4">
                        <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Gross Annual Income (₹)</Label>
                        <div className="relative">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                type="number" 
                                value={income} 
                                onChange={(e) => setIncome(Number(e.target.value))} 
                                className="h-16 pl-12 rounded-2xl glass border-slate-200 text-2xl font-black"
                            />
                        </div>
                        <p className="text-xs font-bold text-slate-400 italic mt-2">Estimation includes standard deduction (New: ₹75k, Old: ₹50k).</p>
                      </div>

                      <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20 space-y-4">
                        <h4 className="font-black text-accent uppercase tracking-widest text-xs flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Tax Optimization Insight
                        </h4>
                        <p className="text-sm text-slate-600 font-medium">The New Regime (FY 2024-25) offers a full rebate for taxable income up to ₹7 Lakhs.</p>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6">
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div>
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">New Regime Tax</p>
                                    <h3 className="text-3xl font-black">₹{itResult.newRegime}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Old Regime Tax</p>
                                    <h3 className="text-2xl font-black text-white/60">₹{itResult.oldRegime}</h3>
                                </div>
                            </div>
                            
                            {Number(itResult.savings) > 0 && (
                                <div className="text-center p-4 rounded-2xl bg-primary/20 border border-primary/20 animate-pulse">
                                    <p className="text-xs font-bold">Estimated Savings in New Regime</p>
                                    <p className="text-2xl font-black text-primary">₹{itResult.savings}</p>
                                </div>
                            )}
                        </div>
                        <div className="pt-6 border-t border-white/10 text-center">
                            <Button asChild className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black text-lg hover:bg-primary hover:text-white transition-all">
                                <a href="#contact">Get Professional Planning</a>
                            </Button>
                        </div>
                   </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tds">
              <Card className="rounded-[2.5rem] glass border-white/60 overflow-hidden shadow-2xl">
                 <div className="grid md:grid-cols-2">
                    <div className="p-10 space-y-8 bg-white/50">
                        <div className="space-y-4">
                            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Payment Amount (₹)</Label>
                            <Input 
                                type="number" 
                                value={tdsAmount} 
                                onChange={(e) => setTdsAmount(Number(e.target.value))} 
                                className="h-14 rounded-xl glass border-slate-200 text-lg font-bold"
                            />
                        </div>
                        <div className="space-y-4">
                            <Label className="text-sm font-black text-slate-500 uppercase tracking-widest">Nature of Payment</Label>
                            <Select onValueChange={setTdsType} defaultValue={tdsType}>
                                <SelectTrigger className="h-14 rounded-xl glass border-slate-200 font-bold">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl glass border-white/40">
                                    {Object.entries(tdsRates).map(([key, value]) => (
                                        <SelectItem key={key} value={key} className="rounded-lg font-medium">
                                            {key} - {value.label} ({value.rate}%)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="p-10 bg-accent text-white space-y-8">
                        <div className="flex items-center gap-3">
                            <Briefcase className="h-6 w-6" />
                            <h3 className="text-xl font-black uppercase tracking-tighter">TDS Summary</h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                <span className="font-bold text-white/70">Gross Amount</span>
                                <span className="text-2xl font-black">₹{tdsAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/20">
                                <span className="font-bold text-white/70">TDS Deduction ({tdsRates[tdsType].rate}%)</span>
                                <span className="text-2xl font-black">₹{tdsResult.deduction}</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="font-black text-lg uppercase">Net Payable</span>
                                <span className="text-4xl font-black">₹{tdsResult.net}</span>
                            </div>
                        </div>
                        <div className="p-4 bg-white/10 rounded-2xl flex gap-3 text-xs leading-relaxed">
                            <Calculator className="h-4 w-4 shrink-0" />
                            Ensure TDS is deposited by the 7th of the following month to avoid interest penalties.
                        </div>
                    </div>
                 </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
