import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Information:', { email, password });
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <p style={styles.text}>
          Don't have an account?{' '}
          <Link href="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#333' },
  form: { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' },
  heading: { textAlign: 'center', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold', color: '#333' },
  field: { marginBottom: '15px' },
  label: { fontWeight: 'bold', color: '#555' },
  input: { width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' },
  button: { width: '100%', padding: '10px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  text: { textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#555' },
  link: { color: '#0070f3', fontWeight: 'bold', textDecoration: 'none' },
};