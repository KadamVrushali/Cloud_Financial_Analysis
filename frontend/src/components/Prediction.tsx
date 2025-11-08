import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, DollarSign } from 'lucide-react';

export function Prediction() {
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    region: '',
    discount: '',
    quantity: '',
  });
  
  const [prediction, setPrediction] = useState<{ sales: number; profit: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock prediction logic
      const basePrice = 100;
      const quantity = parseInt(formData.quantity) || 1;
      const discount = parseFloat(formData.discount) || 0;
      
      const sales = quantity * basePrice * (1 - discount / 100) * (Math.random() * 0.3 + 0.9);
      const profit = sales * (Math.random() * 0.2 + 0.1);
      
      setPrediction({
        sales: Math.round(sales * 100) / 100,
        profit: Math.round(profit * 100) / 100,
      });
      setLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white mb-2">ML-Based Predictions</h2>
        <p className="text-slate-400">Predict sales and profit based on business parameters</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Prediction Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-300">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="furniture" className="text-white hover:bg-slate-700">Furniture</SelectItem>
                  <SelectItem value="technology" className="text-white hover:bg-slate-700">Technology</SelectItem>
                  <SelectItem value="office-supplies" className="text-white hover:bg-slate-700">Office Supplies</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCategory" className="text-slate-300">Sub-Category</Label>
              <Select value={formData.subCategory} onValueChange={(value) => handleInputChange('subCategory', value)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="chairs" className="text-white hover:bg-slate-700">Chairs</SelectItem>
                  <SelectItem value="phones" className="text-white hover:bg-slate-700">Phones</SelectItem>
                  <SelectItem value="storage" className="text-white hover:bg-slate-700">Storage</SelectItem>
                  <SelectItem value="tables" className="text-white hover:bg-slate-700">Tables</SelectItem>
                  <SelectItem value="binders" className="text-white hover:bg-slate-700">Binders</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region" className="text-slate-300">Region</Label>
              <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="east" className="text-white hover:bg-slate-700">East</SelectItem>
                  <SelectItem value="west" className="text-white hover:bg-slate-700">West</SelectItem>
                  <SelectItem value="central" className="text-white hover:bg-slate-700">Central</SelectItem>
                  <SelectItem value="south" className="text-white hover:bg-slate-700">South</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount" className="text-slate-300">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="Enter discount percentage"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-slate-300">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                min="1"
              />
            </div>

            <Button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Predicting...' : 'Predict Sales & Profit'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Display */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Prediction Results</CardTitle>
          </CardHeader>
          <CardContent>
            {prediction ? (
              <div className="space-y-4">
                <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-slate-300">Predicted Sales</span>
                  </div>
                  <p className="text-white">${prediction.sales.toLocaleString()}</p>
                </div>

                <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-slate-300">Predicted Profit</span>
                  </div>
                  <p className="text-white">${prediction.profit.toLocaleString()}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-700">
                  <h4 className="text-slate-300 mb-3">Input Summary</h4>
                  <div className="space-y-2 text-slate-400">
                    {formData.category && (
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="text-white capitalize">{formData.category}</span>
                      </div>
                    )}
                    {formData.subCategory && (
                      <div className="flex justify-between">
                        <span>Sub-Category:</span>
                        <span className="text-white capitalize">{formData.subCategory}</span>
                      </div>
                    )}
                    {formData.region && (
                      <div className="flex justify-between">
                        <span>Region:</span>
                        <span className="text-white capitalize">{formData.region}</span>
                      </div>
                    )}
                    {formData.discount && (
                      <div className="flex justify-between">
                        <span>Discount:</span>
                        <span className="text-white">{formData.discount}%</span>
                      </div>
                    )}
                    {formData.quantity && (
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="text-white">{formData.quantity}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-slate-900 mb-4">
                  <TrendingUp className="h-8 w-8 text-slate-600" />
                </div>
                <p className="text-slate-400">
                  Fill in the parameters and click "Predict" to see ML-based predictions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
