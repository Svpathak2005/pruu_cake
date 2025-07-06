import React, { useState, useEffect } from 'react';

// API Base URL - Change this to your backend URL
const API_BASE_URL = 'http://localhost:5000';

// Simple hardcoded admin credentials for demo
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'password';

const initialCake = {
  name: '',
  image: '',
  price: '',
  shortDescription: '',
  fullDescription: '',
  rating: '',
  reviews: '',
  category: '',
  calories: '',
  fat: '',
  cholesterol: ''
};

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [form, setForm] = useState(initialCake);
  const [success, setSuccess] = useState('');
  // Contact messages state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  // Cakes state
  const [cakes, setCakes] = useState([]);
  const [loadingCakes, setLoadingCakes] = useState(false);
  const [cakesError, setCakesError] = useState('');
  const [editCakeId, setEditCakeId] = useState(null);

  // Fetch cakes from backend
  useEffect(() => {
    if (loggedIn) {
      setLoadingCakes(true);
      setCakesError('');
      fetch(`${API_BASE_URL}/api/cakes`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch cakes');
          return res.json();
        })
        .then(data => {
          setCakes(Array.isArray(data) ? data.sort((a, b) => (b._id || '').localeCompare(a._id || '')) : []);
          setLoadingCakes(false);
        })
        .catch(err => {
          setCakesError(err.message || 'Could not load cakes');
          setLoadingCakes(false);
        });
    }
  }, [loggedIn, success]);

  // Start editing a cake
  function handleEditCake(cake) {
    setEditCakeId(cake._id);
    setForm({ ...cake });
    setSuccess('');
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditCakeId(null);
    setForm(initialCake);
    setSuccess('');
  }

  // Login handler
  function handleLogin(e) {
    e.preventDefault();
    const user = e.target.username.value;
    const pass = e.target.password.value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  }

  // Cake form handler
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      // Upload image to backend
      uploadImage(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  // Upload image to backend (Cloudinary)
  async function uploadImage(file) {
    setSuccess('Uploading image...');
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Image upload failed');
      setForm(prev => ({ ...prev, image: data.url }));
      setSuccess('Image uploaded!');
    } catch (err) {
      setSuccess('Error uploading image: ' + err.message);
    }
  }

  // Cake submit handler (add or update)
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    try {
      let res, data;
      if (editCakeId) {
        // Update existing cake
        res = await fetch(`${API_BASE_URL}/api/cakes/${editCakeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            rating: parseFloat(form.rating),
            reviews: parseInt(form.reviews),
            calories: parseInt(form.calories)
          })
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update cake');
        setSuccess('Cake updated successfully!');
        setEditCakeId(null);
      } else {
        // Add new cake
        res = await fetch(`${API_BASE_URL}/api/cakes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            rating: parseFloat(form.rating),
            reviews: parseInt(form.reviews),
            calories: parseInt(form.calories)
          })
        });
        data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add cake');
        setSuccess('Cake added successfully!');
      }
      setForm(initialCake);
    } catch (err) {
      setSuccess('Error: ' + err.message);
    }
  }

  // Fetch messages from backend
  useEffect(() => {
    if (loggedIn) {
      setLoadingMessages(true);
      setMessagesError('');
      fetch(`${API_BASE_URL}/api/contact`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch messages');
          return res.json();
        })
        .then(data => {
          setMessages(Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
          setLoadingMessages(false);
        })
        .catch(err => {
          setMessagesError(err.message || 'Could not load messages');
          setLoadingMessages(false);
        });
    }
  }, [loggedIn]);

  // Delete a cake - FIXED VERSION
  async function handleDeleteCake(id) {
    if (!window.confirm('Are you sure you want to delete this cake?')) return;
    setSuccess('Deleting cake...');
    try {
      console.log('Attempting to delete cake with ID:', id);
      const res = await fetch(`${API_BASE_URL}/api/cakes/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error('Error parsing JSON response:', jsonErr);
        data = { error: 'Invalid server response' };
      }
      
      if (!res.ok) {
        console.error('Delete failed with status:', res.status);
        if (res.status === 404) {
          setSuccess('Cake not found. It may have already been deleted. Removing from list.');
          setCakes(prev => prev.filter(c => c._id !== id));
          if (editCakeId === id) handleCancelEdit();
        } else {
          setSuccess('Error: ' + (data.error || 'Failed to delete cake'));
        }
        return;
      }
      
      setSuccess('Cake deleted successfully!');
      setCakes(prev => prev.filter(c => c._id !== id));
      if (editCakeId === id) handleCancelEdit();
    } catch (err) {
      console.error('Delete exception:', err);
      setSuccess('Error: ' + err.message);
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Admin Login</h2>
          <input name="username" type="text" placeholder="Username" className="w-full mb-4 px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
          <input name="password" type="password" placeholder="Password" className="w-full mb-4 px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
          {loginError && <div className="text-red-500 mb-4 text-center">{loginError}</div>}
          <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded font-semibold hover:bg-rose-700 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-10">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl px-2 md:px-8 xl:px-0">
        {/* Add/Edit Cake Section */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-700 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">{editCakeId ? 'Edit Cake' : 'Add New Cake'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Cake Name" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <div className="flex gap-2 items-center">
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-rose-600"
                required={!form.image}
              />
              {form.image && (
                <img src={form.image} alt="Cake Preview" className="w-16 h-16 object-cover rounded border border-gray-700" />
              )}
            </div>
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} placeholder="Full Description" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating (e.g. 4.8)" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="reviews" value={form.reviews} onChange={handleChange} placeholder="Reviews (number)" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category (e.g. Cake)" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="calories" value={form.calories} onChange={handleChange} placeholder="Calories" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="fat" value={form.fat} onChange={handleChange} placeholder="Fat (e.g. 18g)" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <input name="cholesterol" value={form.cholesterol} onChange={handleChange} placeholder="Cholesterol (e.g. 45mg)" className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-600" required />
            <div className="flex gap-2">
              <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded font-semibold hover:bg-rose-700 transition">
                {editCakeId ? 'Update Cake' : 'Add Cake'}
              </button>
              {editCakeId && (
                <button type="button" onClick={handleCancelEdit} className="w-full bg-gray-700 text-white py-2 rounded font-semibold hover:bg-gray-600 transition">Cancel</button>
              )}
            </div>
          </form>
          {success && <div className={`mt-4 text-center ${success.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>{success}</div>}
        </div>

        {/* Cakes List Section */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">All Cakes</h2>
          {loadingCakes ? (
            <div className="text-gray-400 text-center py-8">Loading cakes...</div>
          ) : cakesError ? (
            <div className="text-red-400 text-center py-8">{cakesError}</div>
          ) : cakes.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No cakes found.</div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {cakes.map(cake => (
                <div key={cake._id} className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl p-6 border border-gray-700 shadow-xl flex flex-col gap-3 hover:border-rose-500 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {cake.image && <img src={cake.image} alt="Cake" className="w-16 h-16 object-cover rounded-2xl border-2 border-rose-400 shadow-md" />}
                      <div>
                        <div className="font-bold text-xl text-rose-400">{cake.name}</div>
                        <div className="text-xs text-gray-400 font-medium bg-gray-800 rounded-full px-3 py-1 inline-block mt-1">{cake.category}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditCake(cake)} className="bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-pink-700 hover:to-rose-700 transition text-sm font-semibold shadow-md">Edit</button>
                      <button onClick={() => handleDeleteCake(cake._id)} className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-4 py-2 rounded-xl hover:from-rose-800 hover:to-red-800 transition text-sm font-semibold shadow-md">Delete</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-2">
                    <div className="bg-gray-900 rounded-xl p-2">
                      <div className="text-lg font-bold text-rose-400">{cake.price}</div>
                      <div className="text-xs text-gray-400">Price</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-2">
                      <div className="text-lg font-bold text-yellow-400">{cake.rating}★</div>
                      <div className="text-xs text-gray-400">{cake.reviews} reviews</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-2">
                      <div className="text-lg font-bold text-blue-400">{cake.calories}</div>
                      <div className="text-xs text-gray-400">Calories</div>
                    </div>
                    <div className="bg-gray-900 rounded-xl p-2">
                      <div className="text-lg font-bold text-green-400">{cake.fat}</div>
                      <div className="text-xs text-gray-400">Fat</div>
                    </div>
                  </div>
                  <div className="text-gray-200 text-base mt-3 italic border-l-4 border-rose-400 pl-4 bg-gray-900/60 rounded-xl py-2">{cake.shortDescription}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Messages Section */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-700 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Contact Messages</h2>
          {loadingMessages ? (
            <div className="text-gray-400 text-center py-8">Loading messages...</div>
          ) : messagesError ? (
            <div className="text-red-400 text-center py-8">{messagesError}</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-400 text-center py-8">No messages found.</div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {messages.map(msg => (
                <div key={msg._id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow flex flex-col gap-2 hover:border-rose-600 transition">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-2">
                    <div className="font-bold text-lg text-rose-400">{msg.name}</div>
                    <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-gray-300 text-sm mb-1"><span className="font-semibold text-gray-400">Phone:</span> {msg.phone}</div>
                  <div className="text-gray-300 text-sm mb-1"><span className="font-semibold text-gray-400">Email:</span> {msg.email}</div>
                  <div className="text-gray-300 text-sm mb-1"><span className="font-semibold text-gray-400">Event:</span> {msg.eventType}</div>
                  <div className="text-gray-200 text-base mt-2">{msg.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}