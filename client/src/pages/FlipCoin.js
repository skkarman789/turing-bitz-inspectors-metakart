import { useState, useEffect } from "react";
import React from "react";
import flipCoinLogo from "../assets/flipCoin.png";
import flipCoinDetail from "../assets/flipcoinDetail.png";

// import { Box, Typography, styled, Button } from '@mui/material';
import Layout from "../components/Layout/Layout";
import {
  Box,
  Typography,
  styled,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import loyalty from "../artifacts/contracts/loyalty.sol/loyalty.json";
const ethers = require("ethers");

const Main = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #ececec;
`;

const Component = styled(Box)`
  height: 100%;
  width: 800px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* Added top margin */
`;

const Image = styled("img")({
  height: 58,
  marginTop: 20,
  marginLeft: -10,
  padding: 14,
});

const Container = styled(Box)`
  display: flex;
  align-items: center;
`;

const Coins = styled(Typography)`
  float: right;
`;

const StyledRow = styled(Typography)`
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Heading = styled(Typography)`
  margin-top: -10px;
`;

const ButtonWrapper = styled("div")({
  textAlign: "center",
  marginTop: "20px",
});
const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
});
const TableWrapper = styled(Box)`
  .MuiTableCell-root {
    border: 1px solid #ddd;
    text-align: center;
    padding: 8px;
  }

  .MuiTableRow-root {
    border-bottom: 1px solid #ddd;
  }
`;

const FlipCoin = () => {
  const [Account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [state, setState] = useState(null);
  const [signer, setSigner] = useState(null);
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x7beFb899f168daBAf758995257d0BBBEC778352A";
      const contractABI = loyalty.abi;

      try {
        if (window.ethereum) {
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(account[0]);

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
            setAccount(account[0]);
          });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ contract, provider, signer });
          setContract(contract);
          setProvider(provider);
          setSigner(signer);

          let balanceBigN = await contract.balanceOf(account[0]);
          // console.log(account[0])
          let balanceNumber = balanceBigN.toNumber();
          setBalance(balanceNumber);
        } else {
          alert("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const memosMessage = async () => {
      if (contract) {
        const memos = await contract.getfc();
        setMemos(memos);
      }
    };

    connectWallet();
    if (contract) {
      memosMessage();
    }
  }, [Account]);
  const reversedMemos = [...memos].reverse();

  return (
    <Layout>
      <Main>
        <Component>
          <Container>
            {/* <Image src={flipCoinLogo} alt='flipCoin' /> */}
            <Heading
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: 20,
                padding: 10,
                marginTop: 28,
              }}
            >
              FlipCoin Balance
            </Heading>
            <Image
              style={{ marginLeft: "48%" }}
              src={flipCoinLogo}
              alt="flipCoin"
            />
            <Typography
              style={{
                marginTop: 23,
                marginLeft: "-1.5%",
                fontWeight: 600,
                fontSize: 20,
              }}
            >
              {balance}
            </Typography>
          </Container>

          <img
            src={flipCoinDetail}
            style={{ width: "100%", height: "30%" }}
            alt="flipCoinDetail"
            className="mt--6"
          />
          <div className="mt-2"></div>
          <TableWrapper>
            <Table size="small">
              <TableHead style={{ backgroundColor: "#0f0489ff" }}>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", color: "white " }}>
                    Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white " }}>
                    Transaction Type
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white " }}>
                    From
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white " }}>
                    To
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", color: "white " }}>
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reversedMemos.map((i, index) => {
                  if (index < 100) {
                    return (
                      <TableRow key={i.issuetime}>
                        <TableCell>
                          {new Date(i.issueTime * 1000).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {i.Activity === "spend" ? "Debit" : "Credit"}
                        </TableCell>
                        <TableCell>{i.from.substring(0, 6)}...</TableCell>
                        <TableCell>{i.to.substring(0, 6)}...</TableCell>
                        <TableCell>
                          <Coins
                            style={{
                              color: i.Activity === "spend" ? "red" : "green",
                            }}
                          >
                            {i.Activity === "spend" ? "-" : "+"}{" "}
                            {String(i.amount)}
                          </Coins>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableWrapper>
        </Component>
      </Main>
    </Layout>
  );
};

export default FlipCoin;
