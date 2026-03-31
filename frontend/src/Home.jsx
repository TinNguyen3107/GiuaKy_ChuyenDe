import { useState, useEffect } from 'react';

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  // Lấy dữ liệu từ Backend
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Lỗi khi fetch data", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Gửi dữ liệu lên Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    
    await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    
    setContent('');
    fetchNotes(); // Load lại danh sách
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ứng dụng Ghi chú</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Nhập ghi chú mới..."
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 10px' }}>Thêm</button>
      </form>
      
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;