import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Spinner, Stack, Skeleton } from '@chakra-ui/react';

export function PaymentHistory() {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${apiUrl}/payment/history`)
      .then((res) => {
        setPayments(res.data.payments);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching payments:', err);
        setLoading(false);
      });
  }, []);

  function statusColor(status) {
    switch (status) {
      case 'captured': return 'green';
      case 'failed': return 'red';
      case 'authorized': return 'yellow';
      case 'refunded': return 'blue';
      default: return 'gray';
    }
  }

  function formatAmount(paise) {
    return '₹' + (paise / 100).toFixed(2);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        Payment History
      </h1>

      {loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : payments.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'gray' }}>No payments found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#3399cc', color: 'white' }}>
                <th style={th}>Sr.No</th>
                <th style={th}>Payment ID</th>
                <th style={th}>Order ID</th>
                <th style={th}>Product</th>
                <th style={th}>Amount</th>
                <th style={th}>Method</th>
                <th style={th}>Status</th>
                <th style={th}>Email</th>
                <th style={th}>Contact</th>
                <th style={th}>Date &amp; Time</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr key={p._id} style={{ background: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td style={td}>{index + 1}</td>
                  <td style={{ ...td, fontFamily: 'monospace', fontSize: '12px' }}>{p.razorpay_payment_id}</td>
                  <td style={{ ...td, fontFamily: 'monospace', fontSize: '12px' }}>{p.razorpay_order_id}</td>
                  <td style={td}>{p.productname || '—'}</td>
                  <td style={{ ...td, fontWeight: 'bold' }}>{p.amount ? formatAmount(p.amount) : '—'}</td>
                  <td style={td}>{p.method ? p.method.toUpperCase() : '—'}</td>
                  <td style={td}>
                    <Badge colorScheme={statusColor(p.status)}>{p.status}</Badge>
                  </td>
                  <td style={td}>{p.email || '—'}</td>
                  <td style={td}>{p.contact || '—'}</td>
                  <td style={td}>
                    {new Date(p.createdAt).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  padding: '12px 16px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const td = {
  padding: '10px 16px',
  borderBottom: '1px solid #eee',
};

