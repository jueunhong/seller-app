import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Copy, Check } from "lucide-react"
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {doc, getDoc,collection} from "firebase/firestore";
import firebaseExports from "../firebase.js";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    max-width: 90%;
    padding: 2rem;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`

const CardHeader = styled.div`
  background: #f7f7f7;
  padding: 1rem;
`

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #444;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`

const CardContent = styled.div`
  padding: 1rem;
`

const Text = styled.p`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const Bold = styled.span`
  font-weight: 600;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background: ${(props) => (props.copied ? "#4CAF50" : "#ffffff")};
  color: ${(props) => (props.copied ? "#ffffff" : "#333")};
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 0.5rem;

  &:hover {
    background: ${(props) => (props.copied ? "#45a049" : "#f0f0f0")};
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.75rem;
  border-bottom: 2px solid #ddd;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const Td = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`

const RightAligned = styled.div`
  text-align: right;
`

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ddd;
  font-size: 0.875rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: auto;
    font-size: 1rem;
  }
`

const SelectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const MobileTable = styled.div`
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
`

const MobileRow = styled.div`
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
  }
`
const {db} = firebaseExports;
const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sellerId = String( location.state.sellerId);
    const [monthlyData, setMonthlyData] = useState(null)
  const [copied, setCopied] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState("1")
  const [sellerName, setSellerName] = useState("")

  useEffect(() => {
    
    if (!sellerId) {
      console.error("No sellerId found, redirecting to login...");
      navigate("/"); // sellerId가 없으면 로그인 페이지로 리디렉트
      return;
    }

    const fetchData = async () => {
      try {
        const collectionName = `${selectedMonth}월 수수료`; // 컬렉션 이름 문자열로 유지
        const docRef = doc(db, collectionName, sellerId); // Firestore 문서 참조
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setMonthlyData(data);
          setSellerName(data.name || "이름 없음");
        } else {
          console.warn(`No document found for sellerId: ${sellerId}`);
          setMonthlyData(null);
          setSellerName("");
        }
      } catch (e) {
        console.error("Error getting document:", e);
        setMonthlyData(null);
        setSellerName("");
      }
    };

    fetchData();
  }, [selectedMonth, sellerId, navigate]);
  
    const sellerData = monthlyData;
  const kakaopayCommission = sellerData ? Math.round(sellerData.수수료 ) : 0
  const accountInfo = "토스뱅크 1000-8777-6507 홍주은"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountInfo).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "number") return value.toLocaleString()
    return value
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>{sellerName} 어드민</Title>

        <SelectWrapper>
          <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="1">1월</option>
            <option value="2">2월</option>
            {/* Add more months as needed */}
          </Select>
        </SelectWrapper>

        <Card>
          <CardHeader>
            <CardTitle>{selectedMonth}월 수수료 안내</CardTitle>
          </CardHeader>
          <CardContent>
            <Text>
              <Bold>수수료 액수:</Bold> {sellerData ? `${kakaopayCommission.toLocaleString()}원` : "-"}
            </Text>
            <Text>
              <Bold>입금기한:</Bold>{" "}
              {sellerData
                ? new Date(2025, Number.parseInt(selectedMonth), 20).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "-"}
            </Text>
            <Text>
              <Bold>입금계좌:</Bold> {accountInfo}
              <Button onClick={copyToClipboard} copied={copied}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span style={{ marginLeft: "0.5rem" }}>{copied ? "복사됨" : "복사"}</span>
              </Button>
            </Text>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{selectedMonth}월 매출 요약</CardTitle>
          </CardHeader>
          <CardContent>
            {sellerData ? (
              <MobileTable>
                <MobileRow>
    <Text>판매 상품 수</Text>
    <RightAligned>{formatValue(sellerData['판매 상품 수'])}</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>계좌이체 판매 상품 수</Text>
    <RightAligned>{formatValue(sellerData['계좌이체 판매 상품 수'])}</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>카카오페이 판매 상품 수</Text>
    <RightAligned>{formatValue(sellerData['카카오페이 판매 상품 수'])}</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>총매출</Text>
    <RightAligned>{formatValue(sellerData['총 매출'])}원</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>계좌이체 결제액</Text>
    <RightAligned>{formatValue(sellerData['계좌이체 결제액'])}원</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>카카오페이 결제액</Text>
    <RightAligned>{formatValue(sellerData['카카오페이 결제액'])}원</RightAligned>
  </MobileRow>
  <MobileRow>
    <Text>수수료(카카오페이 결제액*3.3%)</Text>
    <RightAligned>{formatValue(sellerData['수수료'])}원</RightAligned>
  </MobileRow>
              </MobileTable>
            ) : (
              <Text>데이터가 없습니다.</Text>
            )}
          </CardContent>
        </Card>
        <Card>
          <Text>
            추후 어드민 업데이트를 통해 판매된 상품 리스트 등 상세한 매출 내역을 확인할 수 있습니다.
          </Text>
        </Card>
      </Container>
    </>
  )
}

export default Admin;

