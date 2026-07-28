'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, IndianRupee, PieChart, Info, TrendingUp } from 'lucide-react';

export default function ToolsSection() {
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isInclusive, setIsInclusive] = useState(false);

  const [income, setIncome] = useState<number>(800000);
  
  // Simple GST logic
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

  // Simple Income Tax logic (Approx for estimation)
  const calculateIT = () => {
    // Very simplified logic for Old vs New 2024-25
    const standardDeduction = 75000;
    const taxableIncome = Math.max(0, income - standardDeduction);
    
    // New Regime Approx
    let newRegimeTax = 0;
    if (taxableIncome > 300000) {
      if (taxableIncome <= 700000) newRegimeTax = 0; // Rebate
      else {
        // Simplified steps
        if (taxableIncome > 1500000) newRegimeTax = 150000 + (taxableIncome - 1500000) * 0.3;
        else if (taxableIncome > 1200000) newRegimeTax = 90000 + (taxableIncome - 1200000) * 0.2;
        else newRegimeTax = (taxableIncome - 300000) * 0.1;
      }
    }

    return { newRegime: newRegimeTax.toFixed(0) };
  };

  const itResult = calculateIT();

  return (
    <section id="tools" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-slate-900">
            Compliance <span className="liquid-text">Toolkit</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium">
            Interactive financial tools designed for modern entrepreneurs and businesses.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="gst" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-12 h-16 p-2 rounded-2xl glass border-slate-200">
              <TabsTrigger value="gst" className="rounded-xl font-black uppercase tracking-widest text-xs">GST Calculator</TabsTrigger>
              <TabsTrigger value="it" className="rounded-xl font-black uppercase tracking-widest text-xs">IT Estimator</TabsTrigger>
            </TabsList>

            <TabsContent value="gst">
              <Card className="rounded-[2.5rem] glass border-white/60 overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2">
                  <div className="p-10 space-y-8 bg-slate-50/50">
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
                      <div className="flex gap-2">
                        {[5, 12, 18, 28].map(rate => (
                          <Button 
                            key={rate} 
                            variant={gstRate === rate ? 'default' : 'outline'}
                            onClick={() => setGstRate(rate)}
                            className="flex-1 rounded-xl h-12 font-bold"
                          >
                            {rate}%
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant={isInclusive ? 'outline' : 'default'} 
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
                        <h3 className="text-xl font-black uppercase tracking-tighter">Calculation Summary</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b border-white/20">
                        <span className="font-bold text-white/70">Base Amount</span>
                        <span className="text-2xl font-black">₹{gstResult.base}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-white/20">
                        <span className="font-bold text-white/70">GST Amount ({gstRate}%)</span>
                        <span className="text-2xl font-black">₹{gstResult.gst}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="font-black text-lg uppercase">Total Amount</span>
                        <span className="text-4xl font-black">₹{gstResult.total}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/10 rounded-2xl flex gap-3 text-xs leading-relaxed">
                        <Info className="h-4 w-4 shrink-0" />
                        This calculation provides a standard GST breakdown based on the provided inputs for quick estimation.
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
                        <p className="text-xs font-bold text-slate-400 italic mt-2">Note: Estimation includes standard deduction of ₹75,000 (New Regime FY 24-25).</p>
                      </div>

                      <div className="p-6 rounded-3xl bg-accent/5 border border-accent/20 space-y-4">
                        <h4 className="font-black text-accent uppercase tracking-widest text-xs flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Tax Optimization Tip
                        </h4>
                        <p className="text-sm text-slate-600 font-medium">For incomes up to ₹7 Lakhs, the New Regime offers a full tax rebate under Section 87A.</p>
                      </div>
                   </div>

                   <div className="bg-slate-900 rounded-[2rem] p-10 text-white flex flex-col justify-center space-y-8">
                        <div className="text-center space-y-2">
                            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">Estimated Tax (New Regime)</p>
                            <h3 className="text-6xl font-black text-primary">₹{itResult.newRegime}</h3>
                        </div>
                        <div className="pt-8 border-t border-white/10 text-center">
                            <p className="text-sm text-white/50 font-bold mb-4">WANT A DETAILED COMPLIANCE PLAN?</p>
                            <Button asChild className="w-full h-14 rounded-2xl bg-white text-slate-900 font-black text-lg hover:bg-primary hover:text-white transition-all">
                                <a href="#contact">Consult an Expert</a>
                            </Button>
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
