import React, { useState, useEffect } from 'react';

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
      const res = await fetch('/api/upload', {
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


  // Cake submit handler (now posts to backend API)
  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/cakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rating: parseFloat(form.rating),
          reviews: parseInt(form.reviews),
          calories: parseInt(form.calories)
        })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add cake');
      }
      setSuccess('Cake added successfully!');
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
      fetch('/api/contact')
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
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Add Cake Section */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-700 flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Add New Cake</h2>
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
            <button type="submit" className="w-full bg-rose-600 text-white py-2 rounded font-semibold hover:bg-rose-700 transition">Add Cake</button>
          </form>
          {success && <div className="text-green-400 mt-4 text-center">{success}</div>}
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
