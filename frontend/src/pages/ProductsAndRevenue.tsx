import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShoppingBag, 
  Plus, 
  IndianRupee, 
  TrendingUp, 
  PackageCheck, 
  Tag, 
  Search, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  BarChart, 
  Calendar
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  nameMr?: string;
  category: string;
  description: string;
  descriptionMr?: string;
  price: number;
  stockQty: number;
  unitsSold: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface ProductSale {
  id: string;
  productId: string;
  productName: string;
  productNameMr?: string;
  buyerName: string;
  buyerNameMr?: string;
  qty: number;
  totalAmount: number;
  paymentMethod: string;
  date: string;
}

export const ProductsAndRevenue: React.FC = () => {
  const { t, tr, tv, language } = useLanguage();
  const mr = <T,>(en: T, mrValue: T | undefined) => (language === 'mr' && mrValue ? mrValue : en);

  // Products State
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod_1',
      name: 'Handcrafted Greeting Cards & Festive Gift Packs',
      nameMr: 'हस्तनिर्मित शुभेच्छापत्रे व सणासुदीचे भेट संच',
      category: 'Handicrafts',
      description: 'Handmade greeting cards created by Palawi youth for corporate gifting and drives.',
      descriptionMr: 'कॉर्पोरेट भेटवस्तू व उपक्रमांसाठी पालवीतील युवकांनी बनवलेली हस्तनिर्मित शुभेच्छापत्रे.',
      price: 150,
      stockQty: 240,
      unitsSold: 450,
      status: 'In Stock',
    },
    {
      id: 'prod_2',
      name: 'Eco-Friendly Cotton Tote Bags',
      nameMr: 'पर्यावरणपूरक सुती पिशव्या',
      category: 'Apparel & Bags',
      description: 'Re-usable cotton canvas shopping bags printed with eco-sustainability messages.',
      descriptionMr: 'पर्यावरण संवर्धनाचे संदेश छापलेल्या, पुन्हा वापरता येणाऱ्या सुती कॅनव्हास पिशव्या.',
      price: 250,
      stockQty: 180,
      unitsSold: 320,
      status: 'In Stock',
    },
    {
      id: 'prod_3',
      name: 'Organic Wheat & Jwari Grain Packs (10kg)',
      nameMr: 'सेंद्रिय गहू व ज्वारी धान्य पॅक (१० किलो)',
      category: 'Food & Grains',
      description: 'Locally processed organic grains packaged directly from Pandharpur farmers.',
      descriptionMr: 'पंढरपूरच्या शेतकऱ्यांकडून थेट घेतलेले, स्थानिक प्रक्रिया केलेले सेंद्रिय धान्य.',
      price: 600,
      stockQty: 90,
      unitsSold: 180,
      status: 'In Stock',
    },
    {
      id: 'prod_4',
      name: 'Natural Herbal Soap & Hygiene Gift Kit',
      nameMr: 'नैसर्गिक हर्बल साबण व स्वच्छता भेट संच',
      category: 'Health & Wellness',
      description: 'Artisanal organic coconut oil and neem soap bundles for corporate CSR drives.',
      descriptionMr: 'कॉर्पोरेट सीएसआर उपक्रमांसाठी हाताने बनवलेले खोबरेल तेल व कडुलिंबाचे सेंद्रिय साबण संच.',
      price: 200,
      stockQty: 30,
      unitsSold: 210,
      status: 'Low Stock',
    },
  ]);

  // Sales Transactions State
  const [sales, setSales] = useState<ProductSale[]>([
    {
      id: 'sale_101',
      productId: 'prod_1',
      productName: 'Handcrafted Greeting Cards & Festive Gift Packs',
      productNameMr: 'हस्तनिर्मित शुभेच्छापत्रे व सणासुदीचे भेट संच',
      buyerName: 'Sweri Educational Trust',
      buyerNameMr: 'स्वेरी शैक्षणिक ट्रस्ट',
      qty: 100,
      totalAmount: 15000,
      paymentMethod: 'UPI / Online Transfer',
      date: '2026-10-24',
    },
    {
      id: 'sale_102',
      productId: 'prod_2',
      productName: 'Eco-Friendly Cotton Tote Bags',
      productNameMr: 'पर्यावरणपूरक सुती पिशव्या',
      buyerName: 'Bank Of India (Pandharpur Branch)',
      buyerNameMr: 'बँक ऑफ इंडिया, पंढरपूर शाखा',
      qty: 50,
      totalAmount: 12500,
      paymentMethod: 'Bank Transfer / NEFT',
      date: '2026-10-22',
    },
    {
      id: 'sale_103',
      productId: 'prod_3',
      productName: 'Organic Wheat & Jwari Grain Packs (10kg)',
      productNameMr: 'सेंद्रिय गहू व ज्वारी धान्य पॅक (१० किलो)',
      buyerName: 'Aamjat Inamdar',
      buyerNameMr: 'आमजत इनामदार',
      qty: 20,
      totalAmount: 12000,
      paymentMethod: 'Cash',
      date: '2026-10-18',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'catalog' | 'sales'>('catalog');
  const [search, setSearch] = useState('');

  // Add Product Modal State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [pName, setPName] = useState('');
  const [pCategory, setPCategory] = useState('Handicrafts');
  const [pDesc, setPDesc] = useState('');
  const [pPrice, setPPrice] = useState(200);
  const [pStock, setPStock] = useState(100);

  // Add Sale Modal State
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [selectedProdId, setSelectedProdId] = useState('prod_1');
  const [buyerName, setBuyerName] = useState('');
  const [saleQty, setSaleQty] = useState(10);
  const [salePaymentMethod, setSalePaymentMethod] = useState('UPI / Online Transfer');

  // Calculated metrics
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
  const totalUnitsSold = sales.reduce((acc, s) => acc + s.qty, 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName) return;

    const newProd: ProductItem = {
      id: `prod_${Date.now()}`,
      name: pName,
      category: pCategory,
      description: pDesc || tr('NGO handcrafted social enterprise product.', 'संस्थेचे हस्तनिर्मित सामाजिक उपक्रम उत्पादन.'),
      price: Number(pPrice),
      stockQty: Number(pStock),
      unitsSold: 0,
      status: Number(pStock) > 50 ? 'In Stock' : Number(pStock) > 0 ? 'Low Stock' : 'Out of Stock',
    };

    setProducts([newProd, ...products]);
    setShowAddProductModal(false);
    setPName('');
    setPDesc('');
  };

  const handleSaveSale = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === selectedProdId) || products[0];
    if (!prod || !buyerName) return;

    const newSale: ProductSale = {
      id: `sale_${Date.now()}`,
      productId: prod.id,
      productName: prod.name,
      productNameMr: prod.nameMr,
      buyerName,
      qty: Number(saleQty),
      totalAmount: prod.price * Number(saleQty),
      paymentMethod: salePaymentMethod,
      date: new Date().toISOString().split('T')[0],
    };

    setSales([newSale, ...sales]);

    // Update product stock and units sold
    setProducts(
      products.map((p) => {
        if (p.id === prod.id) {
          const newQty = Math.max(0, p.stockQty - Number(saleQty));
          return {
            ...p,
            stockQty: newQty,
            unitsSold: p.unitsSold + Number(saleQty),
            status: newQty > 50 ? 'In Stock' : newQty > 0 ? 'Low Stock' : 'Out of Stock',
          };
        }
        return p;
      })
    );

    setShowAddSaleModal(false);
    setBuyerName('');
  };

  const filteredProducts = products.filter((p) =>
    [p.name, p.nameMr ?? '', p.category, tv(p.category)].some((field) =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 space-y-6 bg-slate-50 text-slate-900 min-h-[calc(100vh-61px)] font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#039583] flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'सामाजिक उपक्रम व वस्तू विक्री' : 'Palawi NGO Social Enterprise'}</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-0.5">
            {tr('Products & Revenue', 'उत्पादने व महसूल')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'mr' 
              ? 'पालवी संस्थेची वस्तू उत्पादने, विक्री दर व उत्पन्न नोंद व्यवस्थापन' 
              : 'Manage products sold by Palawi NGO, record corporate purchases, and track social enterprise revenue.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-3.5 py-2 bg-[#023b77] hover:bg-[#023b77]/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{tr('Add Product', 'उत्पादन जोडा')}</span>
          </button>

          <button
            onClick={() => setShowAddSaleModal(true)}
            className="px-3.5 py-2 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{tr('Record Sale', 'विक्री नोंदवा')}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>{tr('Total Sales Revenue', 'एकूण विक्री उत्पन्न')}</span>
            <div className="p-2 rounded-xl bg-[#023b77]/10 text-[#023b77]">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-[#039583] font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{tr('100% Proceeds Support Children', 'संपूर्ण उत्पन्न मुलांच्या मदतीसाठी')}</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>{tr('Total Units Sold', 'एकूण विकलेले नग')}</span>
            <div className="p-2 rounded-xl bg-[#039583]/15 text-[#039583]">
              <PackageCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900">
              {totalUnitsSold} {tr('Units', 'नग')}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {sales.length} {tr('Verified Purchase Orders', 'प्रमाणित खरेदी आदेश')}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>{tr('Active Products', 'सक्रिय उत्पादने')}</span>
            <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold font-mono text-slate-900">
              {products.length} {tr('Items', 'वस्तू')}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {tr('Handicrafts & Food Grains', 'हस्तकला व अन्नधान्य')}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>{tr('Top Category', 'आघाडीची श्रेणी')}</span>
            <div className="p-2 rounded-xl bg-[#039583]/15 text-[#039583]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 truncate">
              {tr('Handicrafts & Grains', 'हस्तकला व धान्य')}
            </div>
            <div className="text-xs text-[#039583] font-bold mt-1">
              {tr('High Corporate Demand', 'कॉर्पोरेट मागणी जास्त')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center border-b border-slate-200 space-x-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'catalog'
              ? 'border-[#039583] text-[#039583]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {tr('Product Catalog & Prices', 'उत्पादन सूची व किंमती')} ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`pb-3 border-b-2 transition-all ${
            activeTab === 'sales'
              ? 'border-[#039583] text-[#039583]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {tr('Sales & Revenue History', 'विक्री व उत्पन्न इतिहास')} ({sales.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex items-center justify-between text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={tr('Search products by name or category...', 'नाव किंवा श्रेणीनुसार उत्पादने शोधा...')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-slate-800 focus:outline-none focus:border-[#039583]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#039583] bg-[#039583]/10 px-2 py-0.5 rounded">
                      {tv(prod.category)}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prod.status === 'In Stock'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tv(prod.status)}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {mr(prod.name, prod.nameMr)}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {mr(prod.description, prod.descriptionMr)}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">{tr('Price', 'किंमत')}</span>
                    <span className="text-base font-extrabold font-mono text-[#023b77]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">{tr('Stock', 'साठा')}</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">
                      {prod.stockQty} {tr('units', 'नग')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: SALES & REVENUE TRANSACTIONS */}
      {activeTab === 'sales' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">{tr('Date', 'दिनांक')}</th>
                  <th className="py-3.5 px-4">{tr('Product Name', 'उत्पादनाचे नाव')}</th>
                  <th className="py-3.5 px-4">{tr('Buyer / Corporate Partner', 'खरेदीदार / कॉर्पोरेट भागीदार')}</th>
                  <th className="py-3.5 px-4">{tr('Quantity', 'नग')}</th>
                  <th className="py-3.5 px-4">{tr('Payment Method', 'भरणा पद्धत')}</th>
                  <th className="py-3.5 px-4 text-right">{tr('Total Revenue (₹)', 'एकूण उत्पन्न (₹)')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{sale.date}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{mr(sale.productName, sale.productNameMr)}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#023b77]">{mr(sale.buyerName, sale.buyerNameMr)}</td>
                    <td className="py-3.5 px-4 font-mono font-bold">{sale.qty} {tr('units', 'नग')}</td>
                    <td className="py-3.5 px-4 text-slate-600">{tv(sale.paymentMethod)}</td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#039583] text-sm">
                      ₹{sale.totalAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">{tr('Add New Product', 'नवीन उत्पादन जोडा')}</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Product Title', 'उत्पादनाचे नाव')}</label>
                <input
                  type="text"
                  required
                  placeholder={tr('e.g. Handmade Diya & Candle Sets', 'उदा. हस्तनिर्मित दिवे व मेणबत्ती संच')}
                  value={pName}
                  onChange={(e) => setPName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Category', 'श्रेणी')}</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="Handicrafts">{tv('Handicrafts')}</option>
                    <option value="Apparel & Bags">{tv('Apparel & Bags')}</option>
                    <option value="Food & Grains">{tv('Food & Grains')}</option>
                    <option value="Health & Wellness">{tv('Health & Wellness')}</option>
                    <option value="Educational">{tv('Educational')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Price (₹)', 'किंमत (₹)')}</label>
                  <input
                    type="number"
                    required
                    value={pPrice}
                    onChange={(e) => setPPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Initial Stock Qty', 'सुरुवातीचा साठा')}</label>
                  <input
                    type="number"
                    required
                    value={pStock}
                    onChange={(e) => setPStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Product Description', 'उत्पादनाचे वर्णन')}</label>
                <textarea
                  rows={2}
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  placeholder={tr('Describe materials, craft details, or social enterprise impact...', 'साहित्य, कलाकुसर किंवा सामाजिक परिणामाचे वर्णन करा...')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg transition-colors shadow-2xs"
                >
                  {tr('Save Product', 'उत्पादन जतन करा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RECORD PRODUCT SALE */}
      {showAddSaleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">{tr('Record Product Sale', 'उत्पादन विक्री नोंदवा')}</h3>
              <button onClick={() => setShowAddSaleModal(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveSale} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Select Product', 'उत्पादन निवडा')}</label>
                <select
                  value={selectedProdId}
                  onChange={(e) => setSelectedProdId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {mr(p.name, p.nameMr)} ({tr('Price', 'किंमत')}: ₹{p.price}, {tr('Stock', 'साठा')}: {p.stockQty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">{tr('Buyer / Corporate Customer', 'खरेदीदार / कॉर्पोरेट ग्राहक')}</label>
                <input
                  type="text"
                  required
                  placeholder={tr('e.g. Sweri Educational Trust / Local Donor', 'उदा. स्वेरी शैक्षणिक ट्रस्ट / स्थानिक दाता')}
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Quantity Sold', 'विकलेले नग')}</label>
                  <input
                    type="number"
                    required
                    value={saleQty}
                    onChange={(e) => setSaleQty(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-800 font-bold focus:outline-none focus:border-[#039583]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">{tr('Payment Method', 'भरणा पद्धत')}</label>
                  <select
                    value={salePaymentMethod}
                    onChange={(e) => setSalePaymentMethod(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-medium focus:outline-none focus:border-[#039583]"
                  >
                    <option value="UPI / Online Transfer">{tv('UPI / Online Transfer')}</option>
                    <option value="Bank Transfer / NEFT">{tv('Bank Transfer / NEFT')}</option>
                    <option value="Cash">{tv('Cash')}</option>
                    <option value="Cheque">{tv('Cheque')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSaleModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                >
                  {tr('Cancel', 'रद्द करा')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#039583] hover:bg-[#039583]/90 text-white font-bold rounded-lg transition-colors shadow-2xs"
                >
                  {tr('Record Transaction', 'व्यवहार नोंदवा')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
