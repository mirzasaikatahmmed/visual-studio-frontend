"use client";

import { Plus, Trash2, Edit2, Search, Eye, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  inStock: boolean;
};

type Order = {
  id: string;
  customer: string;
  email: string;
  product: string;
  specs: string;
  date: string;
  status: "Needs Quote" | "In Production" | "Completed" | "Cancelled";
  notes: string;
};

const productCategories = ["Albums & Books", "Wall Art", "Print Sets", "Album Sets", "Photo Prints", "Canvas Wraps", "Framed Prints"];

const initialProducts: Product[] = [
  { id: 1, name: "Silver Flush Mount Album", category: "Albums & Books", price: "299", description: "High-gloss 10×10 flush mount album, 20 spreads.", inStock: true },
  { id: 2, name: "Gold Heirloom Album", category: "Albums & Books", price: "599", description: "Premium 12×12 leather-bound album, 40 spreads.", inStock: true },
  { id: 3, name: "Platinum Box Set", category: "Album Sets", price: "999", description: "Luxury heirloom album + parent albums + print set.", inStock: true },
  { id: 4, name: "Canvas Wall Art", category: "Wall Art", price: "149", description: "Gallery-wrapped canvas print, multiple sizes.", inStock: true },
  { id: 5, name: "Framed Photo Print", category: "Framed Prints", price: "89", description: "Professional framed print, choice of frame style.", inStock: false },
  { id: 6, name: "Photo Print Set (5×7)", category: "Photo Prints", price: "49", description: "Set of 10 professional-grade 5×7 prints.", inStock: true },
];

const initialOrders: Order[] = [
  { id: "Q-10492", customer: "Adam Smith", email: "adam@example.com", product: "Gold Heirloom Album", specs: "12×12, 40 pages, black leather", date: "Apr 20, 2026", status: "Needs Quote", notes: "" },
  { id: "Q-10491", customer: "Jessica W.", email: "jess@gmail.com", product: "Silver Flush Mount Album", specs: "10×10, 20 spreads, white", date: "Apr 18, 2026", status: "In Production", notes: "Rush order — promised by Apr 30." },
  { id: "Q-10490", customer: "Michael B.", email: "michael@example.com", product: "Canvas Wall Art", specs: "24×36, landscape orientation", date: "Apr 15, 2026", status: "Completed", notes: "" },
  { id: "Q-10489", customer: "Lisa T.", email: "lisa@gmail.com", product: "Platinum Box Set", specs: "Custom — full package", date: "Apr 10, 2026", status: "In Production", notes: "Includes 2 parent albums." },
];

const statusStyles: Record<string, string> = {
  "Needs Quote": "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  "In Production": "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  "Completed": "bg-green-500/15 text-green-700 dark:text-green-400",
  "Cancelled": "bg-red-500/15 text-red-700 dark:text-red-400",
};

const blankProduct = (): Omit<Product, "id"> => ({
  name: "", category: "Albums & Books", price: "", description: "", inStock: true
});

export default function StoreAdminPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [productModal, setProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState(blankProduct());

  const [detailModal, setDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderNote, setOrderNote] = useState("");

  const openAddProduct = () => { setEditingProduct(null); setProductForm(blankProduct()); setProductModal(true); };
  const openEditProduct = (p: Product) => { setEditingProduct(p); setProductForm({ name: p.name, category: p.category, price: p.price, description: p.description, inStock: p.inStock }); setProductModal(true); };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productForm, id: editingProduct.id } : p));
    } else {
      setProducts([{ ...productForm, id: Date.now() }, ...products]);
    }
    setProductModal(false);
  };

  const handleDeleteProduct = (id: number) => {
    if (window.confirm("Delete this product?")) setProducts(products.filter(p => p.id !== id));
  };

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setOrderNote(order.notes);
    setDetailModal(true);
  };

  const handleSaveNote = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, notes: orderNote } : o));
    setSelectedOrder({ ...selectedOrder, notes: orderNote });
  };

  const handleStatusChange = (id: string, status: Order["status"]) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : prev);
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase tracking-tight">Print Store</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage products, pricing, and customer orders.</p>
        </div>
        {activeTab === "products" && (
          <button onClick={openAddProduct} className="px-5 py-2.5 bg-brand-400 text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-brand-500 transition-colors rounded-sm">
            <Plus size={15} /> Add Product
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-background border border-border rounded-md p-4">
          <div className="text-2xl font-bold">{orders.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Total Orders</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4">
          <div className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === "Needs Quote").length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Needs Quote</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4">
          <div className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === "In Production").length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">In Production</div>
        </div>
        <div className="bg-background border border-border rounded-md p-4">
          <div className="text-2xl font-bold">{products.length}</div>
          <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Products</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {(["orders", "products"] as const).map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setSearchTerm(""); }}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors -mb-px border-b-2 ${
              activeTab === tab ? "border-brand-400 text-brand-400" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "orders" ? <span className="flex items-center gap-1.5"><ShoppingBag size={12} /> Orders</span> : <span className="flex items-center gap-1.5"><Package size={12} /> Products</span>}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-3 flex-1 bg-muted px-4 py-2.5 rounded-sm">
          <Search size={15} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder={activeTab === "orders" ? "Search by customer, order ID, or product..." : "Search products..."}
            className="bg-transparent border-none outline-none w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {activeTab === "orders" && (
          <select
            className="bg-muted px-4 py-2.5 outline-none border-none text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Needs Quote">Needs Quote</option>
            <option value="In Production">In Production</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        )}
        {activeTab === "products" && (
          <select
            className="bg-muted px-4 py-2.5 outline-none border-none text-xs font-bold uppercase tracking-widest cursor-pointer rounded-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        )}
      </div>

      {/* Orders Table */}
      {activeTab === "orders" && (
        <div className="bg-background border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold hidden md:table-cell">Product</th>
                  <th className="p-4 font-bold hidden lg:table-cell">Date</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs font-bold text-brand-500">{order.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-sm">{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="text-sm font-medium">{order.product}</div>
                      <div className="text-xs text-muted-foreground">{order.specs}</div>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell">{order.date}</td>
                    <td className="p-4">
                      <select
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${statusStyles[order.status]}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                      >
                        <option value="Needs Quote">Needs Quote</option>
                        <option value="In Production">In Production</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => openOrderDetail(order)} className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No orders match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products Table */}
      {activeTab === "products" && (
        <div className="bg-background border border-border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">
                  <th className="p-4 font-bold">Product Name</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Price</th>
                  <th className="p-4 font-bold text-center">Stock</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.description}</div>
                    </td>
                    <td className="p-4"><span className="px-2 py-0.5 bg-muted rounded text-xs font-semibold">{p.category}</span></td>
                    <td className="p-4 font-bold text-brand-500">${p.price}</td>
                    <td className="p-4 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${p.inStock ? "bg-green-500/15 text-green-700 dark:text-green-400" : "bg-red-500/15 text-red-700 dark:text-red-400"}`}>
                        {p.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-1.5">
                      <button onClick={() => openEditProduct(p)} className="p-1.5 text-muted-foreground hover:text-brand-400 hover:bg-brand-400/10 rounded transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No products found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <Modal isOpen={productModal} onClose={() => setProductModal(false)} title={editingProduct ? "Edit Product" : "Add Product"}>
        <form onSubmit={handleSaveProduct} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Name *</label>
            <input type="text" placeholder="e.g. Premium Heirloom Album" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
              value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category *</label>
              <select className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 appearance-none cursor-pointer rounded-sm text-sm"
                value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}>
                {productCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price (USD) *</label>
              <input type="number" placeholder="299" className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors rounded-sm text-sm"
                value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} required />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea rows={3} placeholder="Brief product description..." className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
              value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 cursor-pointer accent-[#dd9454]"
              checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} />
            <span className="text-sm font-semibold">Available / In Stock</span>
          </label>
          <button type="submit" className="w-full bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3.5 hover:bg-brand-500 transition-colors rounded-sm">
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>
        </form>
      </Modal>

      {/* Order Detail Modal */}
      <Modal isOpen={detailModal} onClose={() => setDetailModal(false)} title={`Order ${selectedOrder?.id}`}>
        {selectedOrder && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Customer</div>
                <div className="font-semibold">{selectedOrder.customer}</div>
                <div className="text-xs text-muted-foreground">{selectedOrder.email}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Date</div>
                <div className="text-sm">{selectedOrder.date}</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Product</div>
              <div className="font-semibold">{selectedOrder.product}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{selectedOrder.specs}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Status</div>
              <select
                className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider border-none outline-none cursor-pointer ${statusStyles[selectedOrder.status]}`}
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order["status"])}
              >
                <option value="Needs Quote">Needs Quote</option>
                <option value="In Production">In Production</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Internal Notes</label>
              <textarea rows={3} className="w-full bg-muted border border-border px-4 py-3 outline-none focus:border-brand-400 transition-colors resize-none rounded-sm text-sm"
                placeholder="Add internal notes for this order..." value={orderNote} onChange={(e) => setOrderNote(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button onClick={handleSaveNote} className="flex-1 bg-brand-400 text-white font-bold tracking-widest uppercase text-sm py-3 hover:bg-brand-500 transition-colors rounded-sm">
                Save Notes
              </button>
              <a href={`mailto:${selectedOrder.email}`} className="flex-1 text-center border border-border py-3 font-bold tracking-widest uppercase text-sm hover:border-brand-400 hover:text-brand-400 transition-colors rounded-sm">
                Email Client
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
