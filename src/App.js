import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';


export default function App() {
  const [coins, setCoins] = useState([]);
  const fetchCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
    } catch (e) {
      alert("Api error");
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <Container maxWidth="sm">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin) => (
              <TableRow
                key={coin.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              
                <TableCell align="center" style={{ display: "flex", justifyContent: "center" , alignItems: "center" }}>
                  <img style={{ height: 20, width: 20 }} src={coin.image} />
                  <span style={{ marginLeft: "10px" }}>{coin.symbol.toUpperCase()}</span>
                </TableCell>
                <TableCell align="center">{`$${coin.current_price}`}</TableCell>
                <TableCell align="center" style={{ color: /-/i.test(coin.price_change_percentage_24h) ? "#ff0374" : "#06a847" }}>

                  {coin.price_change_percentage_24h}%

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>

  );
}