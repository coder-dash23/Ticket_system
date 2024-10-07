import React, { useState } from 'react';

const TicketManagementSystem = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    title: '',
    poc: '',
    deadline: '',
    email: '',
    category: '',
    specs: '',
    priority: '-None-',
    products: '',
    status: 'Open',
  });

  const [editTicket, setEditTicket] = useState(null);
  const [categories, setCategories] = useState(['Bug', 'Feature', 'Enhancement', 'Support']);
  const [specsList, setSpecsList] = useState({
    'Login Page': ['John Doe', 'Alice Johnson'],
    'Dashboard': ['Jane Smith', 'Bob Williams'],
  });
  const [products, setProducts] = useState(['Product A', 'Product B']);
  const [priorityOptions] = useState(['-None-', 'High', 'Medium', 'Low']);
  const [statusOptions] = useState(['Open', 'In Progress', 'Resolved', 'Closed']);
  const [successMessage, setSuccessMessage] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'specs') {
      const poc = specsList[value] ? specsList[value][0] : '';
      setNewTicket((prev) => ({
        ...prev,
        poc,
      }));
    }
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (newTicket.title && newTicket.poc && newTicket.deadline && newTicket.email && newTicket.category && newTicket.specs) {
      const newTicketWithId = {
        ...newTicket,
        id: Date.now(),
        assignedDate: new Date().toISOString(),
      };
      setTickets((prev) => [...prev, newTicketWithId]);
      setNewTicket({
        title: '',
        poc: '',
        deadline: '',
        email: '',
        category: '',
        specs: '',
        priority: '-None-',
        products: '',
        status: 'Open',
      });
      setSuccessMessage(`Ticket "${newTicketWithId.title}" has been created successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteTicket = (id) => {
    setTickets((prev) => prev.filter(ticket => ticket.id !== id));
    setSuccessMessage(`Ticket has been deleted successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleEditTicket = (ticket) => {
    setEditTicket(ticket);
    setShowEditPopup(true);
  };

  const handleUpdateTicket = (e) => {
    e.preventDefault();
    setTickets((prev) => prev.map(ticket => (ticket.id === editTicket.id ? { ...ticket, ...editTicket } : ticket)));
    setShowEditPopup(false);
    setSuccessMessage(`Ticket "${editTicket.title}" has been updated successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const closeEditPopup = () => {
    setShowEditPopup(false);
    setEditTicket(null);
  };

  const addNewCategory = (newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const addNewProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const addNewSpec = () => {
    const specName = prompt("Enter new spec:");
    if (specName) {
      const pocName = prompt("Enter POC for this spec:");
      if (pocName) {
        setSpecsList((prev) => ({ ...prev, [specName]: [pocName] }));
      }
    }
  };

  return (
    <div className="font-sans max-w-8xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ticket Management System</h1>
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      <form onSubmit={handleAddTicket} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Ticket</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTicket.title}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={newTicket.email}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline:</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={newTicket.deadline}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category:</label>
            <select
              id="category"
              name="category"
              value={newTicket.category}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="specs" className="block text-sm font-medium mb-1">Products: </label>
            <select
              id="specs"
              name="specs"
              value={newTicket.specs}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="">Select product</option>
              {Object.keys(specsList).map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="poc" className="block text-sm font-medium mb-1">POC:</label>
            <input
              type="text"
              id="poc"
              value={newTicket.poc}
              readOnly
              className="border border-gray-300 rounded w-full p-2 bg-gray-200"
            />
          </div>
          <div>
            <label htmlFor="products" className="block text-sm font-medium mb-1">Specs: </label>
            <select
              id="products"
              name="products"
              value={newTicket.products}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded w-full p-2"
            >
              <option value="">Select a specs</option>
              {products.map(product => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority:</label>
            <select
              id="priority"
              name="priority"
              value={newTicket.priority}
              onChange={handleInputChange}
              className="border border-gray-300 rounded w-full p-2"
            >
              {priorityOptions.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons for adding new categories, specs, and products */}
        <div className="mt-4 flex space-x-2">
          <button type="button" onClick={() => addNewCategory(prompt("Enter new category:"))} className="flex items-center bg-blue-500 text-white rounded px-4 py-2">
            <span className="mr-2">+</span>Add Category
          </button>
          <button type="button" onClick={() => addNewProduct(prompt("Enter new product:"))} className="flex items-center bg-blue-500 text-white rounded px-4 py-2">
            <span className="mr-2">+</span>Add Product
          </button>
          <button type="button" onClick={addNewSpec} className="bg-blue-500 text-white rounded px-3">Add Spec</button>
        </div>

        <button type="submit" className="mt-4 bg-green-500 text-white rounded px-4 py-2">Create Ticket</button>
      </form>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border-b border-gray-300 px-4 py-2">Title</th>
            <th className="border-b border-gray-300 px-4 py-2">POC</th>
            <th className="border-b border-gray-300 px-4 py-2">Deadline</th>
            <th className="border-b border-gray-300 px-4 py-2">Email</th>
            <th className="border-b border-gray-300 px-4 py-2">Category</th>
            <th className="border-b border-gray-300 px-4 py-2">Specs</th>
            <th className="border-b border-gray-300 px-4 py-2">Priority</th>
            <th className="border-b border-gray-300 px-4 py-2">Products</th>
            <th className="border-b border-gray-300 px-4 py-2">Status</th>
            <th className="border-b border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.title}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.poc}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.deadline}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.email}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.category}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.specs}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.priority}</td>
              <td className="border-b border-gray-300 px-4 py-2">{ticket.products}</td>
              <td className="border-b border-gray-300 px-4 py-2">
                <select
                  value={ticket.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setTickets(prev => prev.map(t => (t.id === ticket.id ? { ...t, status: newStatus } : t)));
                  }}
                  className="border border-gray-300 rounded p-1"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="border-b border-gray-300 px-4 py-2">
                <button onClick={() => handleEditTicket(ticket)} className="bg-yellow-500 text-white rounded px-2 mr-2">Edit</button>
                <button onClick={() => handleDeleteTicket(ticket.id)} className="bg-red-500 text-white rounded px-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Ticket Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>
            <form onSubmit={handleUpdateTicket}>
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editTicket.title}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editTicket.email}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium mb-1">Deadline:</label>
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  value={editTicket.deadline}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, deadline: e.target.value }))}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={editTicket.category}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, category: e.target.value }))}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="specs" className="block text-sm font-medium mb-1">Specs:</label>
                <select
                  id="specs"
                  name="specs"
                  value={editTicket.specs}
                  onChange={(e) => {
                    const newSpecs = e.target.value;
                    const poc = specsList[newSpecs] ? specsList[newSpecs][0] : '';
                    setEditTicket(prev => ({ ...prev, specs: newSpecs, poc }));
                  }}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                >
                  {Object.keys(specsList).map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority:</label>
                <select
                  id="priority"
                  name="priority"
                  value={editTicket.priority}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, priority: e.target.value }))}
                  className="border border-gray-300 rounded w-full p-2"
                >
                  {priorityOptions.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="products" className="block text-sm font-medium mb-1">Products:</label>
                <select
                  id="products"
                  name="products"
                  value={editTicket.products}
                  onChange={(e) => setEditTicket(prev => ({ ...prev, products: e.target.value }))}
                  required
                  className="border border-gray-300 rounded w-full p-2"
                >
                  {products.map(product => (
                    <option key={product} value={product}>{product}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="mt-4 bg-green-500 text-white rounded px-4 py-2">Update Ticket</button>
              <button type="button" onClick={closeEditPopup} className="mt-2 bg-gray-300 text-black rounded px-4 py-2">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagementSystem;
