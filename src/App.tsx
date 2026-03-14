import React, { useState } from 'react';
import { Calculator, Coins, CircleDollarSign, Info, Scale, Wallet, Gem, AlertTriangle } from 'lucide-react';

const goldPurities = {
  '24k': 1,
  '22k': 22 / 24,
  '21k': 21 / 24,
  '19k': 19 / 24,
  '18k': 18 / 24,
  '14k': 14 / 24,
  '9k': 9 / 24,
};

export default function App() {
  const [goldGrams, setGoldGrams] = useState<Record<string, string>>({});
  const [goldPrice, setGoldPrice] = useState<string>('');
  const [silverPrice, setSilverPrice] = useState<string>('');
  const [moneySaved, setMoneySaved] = useState<string>('');
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  const handleGoldChange = (purity: string, value: string) => {
    setGoldGrams((prev) => ({ ...prev, [purity]: value }));
  };

  const totalPureGoldGrams = Object.entries(goldGrams).reduce((acc, [k, v]) => {
    const grams = parseFloat(v) || 0;
    return acc + grams * goldPurities[k as keyof typeof goldPurities];
  }, 0);

  const parsedGoldPrice = parseFloat(goldPrice) || 0;
  const monetaryGoldValue = totalPureGoldGrams * parsedGoldPrice;

  const parsedSilverPrice = parseFloat(silverPrice) || 0;
  const moneyNisaab = 612 * parsedSilverPrice;
  const moneySavedValue = parseFloat(moneySaved) || 0;

  const totalAssets = monetaryGoldValue + moneySavedValue;
  const combinedZakat = totalAssets * 0.025;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format(val)
      .replace('$', ''); // Removing $ to keep it generic or user can assume their local currency

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-emerald-800 text-white py-8 shadow-md">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-4">
          <Calculator className="w-8 h-8 text-emerald-300" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Zakat Calculator</h1>
            <p className="text-emerald-100/80 mt-1 text-sm">Calculate your Zakat for Gold and Money accurately</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs Section */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Gold Section */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                <Gem className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-medium">Gold Assets</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                24k Gold Price (per gram)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-stone-400 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(e.target.value)}
                  className="block w-full pl-7 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                  placeholder="e.g. 65.50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-stone-700 border-b border-stone-100 pb-2">Enter Gold Amount by Purity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(goldPurities).map(([purity, multiplier]) => {
                  const val = parseFloat(goldGrams[purity]) || 0;
                  const pureVal = val * multiplier;
                  return (
                    <div key={purity} className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                      <label className="block text-sm font-medium text-stone-700 mb-1">
                        {purity} Gold (grams)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={goldGrams[purity] || ''}
                        onChange={(e) => handleGoldChange(purity, e.target.value)}
                        className="block w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                        placeholder="0.00"
                      />
                      {val > 0 && (
                        <div className="mt-2 text-xs text-stone-500 flex items-start gap-1.5 bg-white p-2 rounded border border-stone-100">
                          <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            {val}g × {multiplier.toFixed(4)} = <strong className="text-stone-700">{pureVal.toFixed(2)}g</strong> of 24k pure gold
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Money Section */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                <Wallet className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-medium">Money & Savings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Silver Price (per gram)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-stone-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value)}
                    className="block w-full pl-7 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                    placeholder="e.g. 0.85"
                  />
                </div>
                {parsedSilverPrice > 0 && (
                  <p className="mt-2 text-xs text-stone-500">
                    Money Nisaab (612g): <strong className="text-stone-700">{formatCurrency(moneyNisaab)}</strong>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Money Saved for the Year
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-stone-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={moneySaved}
                    onChange={(e) => setMoneySaved(e.target.value)}
                    className="block w-full pl-7 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Results Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-lg sticky top-6">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Zakat Summary
            </h2>

            {/* Gold Summary */}
            <div className="mb-6 pb-6 border-b border-stone-700">
              <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-3">Gold Calculation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-300">Total Pure Gold:</span>
                  <span className="font-mono">{totalPureGoldGrams.toFixed(2)}g</span>
                </div>
                {parsedGoldPrice > 0 && totalPureGoldGrams > 0 && (
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Value ({totalPureGoldGrams.toFixed(2)}g × {parsedGoldPrice}):</span>
                    <span className="font-mono">{formatCurrency(monetaryGoldValue)}</span>
                  </div>
                )}
                
                <div className="mt-4 space-y-3">
                  {/* 87g Benchmark */}
                  <div className={`p-3 rounded-lg ${totalPureGoldGrams >= 87 ? 'bg-emerald-900/40 border border-emerald-800' : 'bg-stone-800/50 border border-stone-700'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-emerald-100">87g Benchmark</span>
                      {totalPureGoldGrams >= 87 ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Greater than Nisaab</span>
                      ) : (
                        <span className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">Less than Nisaab</span>
                      )}
                    </div>
                    {totalPureGoldGrams >= 87 && parsedGoldPrice > 0 && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-800/50">
                        <span className="text-emerald-200/70 text-xs">Zakat (2.5% of value)</span>
                        <span className="font-mono font-medium text-emerald-300">{formatCurrency(monetaryGoldValue * 0.025)}</span>
                      </div>
                    )}
                  </div>

                  {/* 93g Benchmark */}
                  <div className={`p-3 rounded-lg ${totalPureGoldGrams >= 93 ? 'bg-emerald-900/40 border border-emerald-800' : 'bg-stone-800/50 border border-stone-700'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-emerald-100">93g Benchmark</span>
                      {totalPureGoldGrams >= 93 ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Greater than Nisaab</span>
                      ) : (
                        <span className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">Less than Nisaab</span>
                      )}
                    </div>
                    {totalPureGoldGrams >= 93 && parsedGoldPrice > 0 && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-800/50">
                        <span className="text-emerald-200/70 text-xs">Zakat (2.5% of value)</span>
                        <span className="font-mono font-medium text-emerald-300">{formatCurrency(monetaryGoldValue * 0.025)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Money Summary */}
            <div className="mb-6 pb-6 border-b border-stone-700">
              <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-3">Money Calculation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-300">Money Saved:</span>
                  <span className="font-mono">{formatCurrency(moneySavedValue)}</span>
                </div>
                
                {parsedSilverPrice > 0 && (
                  <div className={`mt-3 p-3 rounded-lg ${moneySavedValue >= moneyNisaab ? 'bg-emerald-900/40 border border-emerald-800' : 'bg-stone-800/50 border border-stone-700'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-emerald-100">Money Nisaab</span>
                      {moneySavedValue >= moneyNisaab ? (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Greater than Nisaab</span>
                      ) : (
                        <span className="text-xs bg-stone-700 text-stone-300 px-2 py-0.5 rounded">Less than Nisaab</span>
                      )}
                    </div>
                    {moneySavedValue >= moneyNisaab && (
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-emerald-800/50">
                        <span className="text-emerald-200/70 text-xs">Zakat (2.5% of saved)</span>
                        <span className="font-mono font-medium text-emerald-300">{formatCurrency(moneySavedValue * 0.025)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Combined Summary */}
            <div>
              <h3 className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-3">Combined Assets (Gold + Money)</h3>
              <div className="bg-stone-800 rounded-xl p-4 border border-stone-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-stone-300">Total Assets Value:</span>
                  <span className="font-mono text-lg">{formatCurrency(totalAssets)}</span>
                </div>

                {parsedSilverPrice > 0 ? (
                  totalAssets >= moneyNisaab ? (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 text-emerald-300 text-sm p-2.5 rounded-lg border border-emerald-500/20 flex items-start gap-2">
                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                        <p>Above Nisaab ({formatCurrency(moneyNisaab)}). Zakat is obligatory on combined assets.</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-stone-700">
                        <span className="font-medium text-white">Total Zakat (2.5%)</span>
                        <span className="font-mono text-xl font-semibold text-emerald-400">{formatCurrency(combinedZakat)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-stone-700/50 text-stone-300 text-sm p-2.5 rounded-lg flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Combined assets are less than the Money Nisaab ({formatCurrency(moneyNisaab)}). No Zakat obligatory on combined assets.</p>
                    </div>
                  )
                ) : (
                  <div className="text-xs text-stone-500 italic">
                    Enter Silver Price to calculate combined Nisaab.
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowDisclaimer(true)}
                className="w-full mt-6 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Review Important Advisory
              </button>
            </div>

          </div>
        </div>
      </main>

      {/* Footer / Explanation Section */}
      <footer className="max-w-5xl mx-auto px-6 mt-12 mb-12">
        <div className="bg-stone-200/50 rounded-2xl p-8 border border-stone-200 text-stone-700 space-y-6">
          <h2 className="text-xl font-semibold text-stone-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-emerald-600" />
            How Calculations Are Done
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-stone-900">1. Gold Purity Conversion</h3>
                <p className="text-sm mt-1 leading-relaxed">
                  All gold is converted to its 24-karat (pure gold) equivalent. This is done by dividing the karat by 24. For example, 18k gold is 18/24 = 0.75 (75% pure). If you have 20g of 18k gold, it equals 15g of 24k pure gold.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900">2. Gold Nisaab (Benchmarks)</h3>
                <p className="text-sm mt-1 leading-relaxed">
                  The Nisaab (minimum threshold) for gold is generally considered to be either <strong>87 grams</strong> or <strong>93 grams</strong> of pure 24k gold, depending on the school of thought. If your total pure gold meets or exceeds this threshold, Zakat is due.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-stone-900">3. Money & Silver Nisaab</h3>
                <p className="text-sm mt-1 leading-relaxed">
                  The Nisaab for cash and savings is based on the value of <strong>612 grams of silver</strong>. If your total savings equal or exceed the current market value of 612g of silver, Zakat becomes obligatory.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-900">4. Combined Assets & Zakat Rate</h3>
                <p className="text-sm mt-1 leading-relaxed">
                  If you possess a mix of gold and cash, their combined monetary value is evaluated against the Silver Nisaab. The obligatory Zakat rate is <strong>2.5%</strong> (or 1/40th) of your total qualifying wealth. Empty fields in the calculator are automatically treated as zero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl font-semibold text-stone-900">Important Advisory</h2>
            </div>
            <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
              <div className="bg-amber-50 text-amber-800 p-3 rounded-lg border border-amber-200">
                Please note: The calculations and Nisaab benchmarks used in this application are based primarily on the <strong>Hanafi Madhab</strong>.
              </div>
              <p>
                This calculator is provided as a helpful tool to assist you in estimating your Zakat. However, to be absolutely certain, <strong>please check with your local Imam or Ulama</strong> to ensure your Zakat is calculated correctly according to your specific circumstances.
              </p>
              <p>
                Additionally, <strong>you are responsible for the accuracy of the gold and silver prices</strong> you input. Please verify the current market rates with your local jewellery store or a reliable financial source before finalizing your calculation.
              </p>
            </div>
            <button
              onClick={() => setShowDisclaimer(false)}
              className="mt-6 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-xl transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
