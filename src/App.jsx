import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Package, Factory, Truck, Building2, LayoutDashboard, ChevronDown, ChevronRight, Search, Bell, User, Settings, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Filter, Plus, RefreshCw, ChevronLeft, Menu, FileText, DollarSign } from "lucide-react";

const T = {
  bg: "#F3F4F8", sidebar: "#FFF", card: "#FFF", border: "#E2E5EB",
  primary: "#2563EB", success: "#059669", warning: "#D97706", danger: "#DC2626",
  text: "#1A202C", muted: "#64748B", dim: "#94A3B8", accent: "#0891B2",
};

const products = [
  { code: "8912A-R64A0", name: "CUSH PNL-OTR, LH", carType: "MX5A", material: "SPRC440", spec: "0.8*598", stock: 14800, mQty: 25230, sell: 1042, cost: 608, press: "1열", vendor: "구영테크" },
  { code: "8912B-R64A0", name: "CUSH PNL-OTR, RH", carType: "MX5A", material: "SPRC440", spec: "0.8*598", stock: 10600, mQty: 25230, sell: 1042, cost: 608, press: "1열", vendor: "구영테크" },
  { code: "8912C-R64B0", name: "CUSH PNL-INR, LH", carType: "MX5A", material: "SPRC440", spec: "0.8*598", stock: 5700, mQty: 15000, sell: 1161, cost: 1091, press: "1열", vendor: "구영테크" },
  { code: "8912B-R64B0", name: "CUSH PNL-INR, RH", carType: "MX5A", material: "SPRC440", spec: "0.8*598", stock: 9720, mQty: 15000, sell: 1161, cost: 1091, press: "1열", vendor: "구영테크" },
  { code: "83961-A3000", name: "ROLLER ARM LWR", carType: "TAM", material: "SPHC-P", spec: "3.0*148", stock: 1500, mQty: 4500, sell: 1665, cost: 1281, press: "1열", vendor: "-" },
  { code: "83942-A3000P", name: "ROLLER ARM ASSY-RR D", carType: "TAM", material: "SPHC-P", spec: "2.3*108", stock: 711, mQty: 3000, sell: 1199, cost: 920, press: "1열", vendor: "-" },
  { code: "65986-4F000", name: "ASSY GUARD BRKT", carType: "HR", material: "SPHC-P", spec: "2.0*96", stock: 3510, mQty: 8000, sell: 1414, cost: 1035, press: "3열", vendor: "-" },
  { code: "81769-4H000", name: "BAR-T/GATE UPR PROTE", carType: "US4", material: "SPRC440", spec: "1.2*182", stock: 900, mQty: 5000, sell: 1199, cost: 920, press: "1열", vendor: "-" },
  { code: "67119-K5000", name: "DAMPER-ROOF RAIL LH", carType: "NX4A", material: "SPHC-P", spec: "1.6*80", stock: 320, mQty: 2000, sell: 450, cost: 320, press: "1열", vendor: "-" },
  { code: "21525-3N100P", name: "PLATE BAFFLE", carType: "ENG", material: "SPCC", spec: "0.8*120", stock: 2800, mQty: 20000, sell: 85, cost: 52, press: "1열", vendor: "-" },
  { code: "CM284-55100", name: "ISO FIX BRKT", carType: "JG", material: "SPPH590-P", spec: "2.6*140", stock: 6400, mQty: 87000, sell: 229, cost: 140, press: "2열(우신)", vendor: "우신정공" },
  { code: "CM284-55600", name: "CUSH. PANEL BRKT", carType: "JG", material: "SPA1590-P", spec: "2.6*332", stock: 810, mQty: 51000, sell: 332, cost: 245, press: "2열(우신)", vendor: "우신정공" },
  { code: "CM294-56800", name: "REINF SIDE MBR OTR", carType: "JG", material: "SPFC590", spec: "1.6*310", stock: 310, mQty: 10500, sell: 1035, cost: 777, press: "2열(우신)", vendor: "우신정공" },
  { code: "CM294-50100", name: "SIDE MBR-OTR, LH", carType: "JG", material: "SPFC780DP", spec: "2.0*458", stock: 458, mQty: 10500, sell: 1250, cost: 920, press: "2열(MIP)", vendor: "구영테크" },
  { code: "CM334-61202", name: "BASE REINF BRKT PATCH NO.6", carType: "JG", material: "SPCC", spec: "2.3*108", stock: 961, mQty: 500, sell: 158, cost: 145, press: "다온", vendor: "다온산업" },
  { code: "CM284-51000", name: "RR. COVER BRKT", carType: "JG", material: "SPHC-P", spec: "2.0*72", stock: 812, mQty: 10500, sell: 43, cost: 29, press: "다온", vendor: "다온산업" },
  { code: "CM284-54400", name: "WASHER PI32.6X2.3T", carType: "JG", material: "SPHC-P", spec: "2.3*104", stock: 70, mQty: 10500, sell: 37, cost: 27, press: "다온", vendor: "다온산업" },
  { code: "CM284-50800", name: "FR. COVER BRKT LH", carType: "JG", material: "SPFH590-P", spec: "2.0*144", stock: 629, mQty: 10500, sell: 506, cost: 461, press: "다온", vendor: "다온산업" },
  { code: "CM284-60800", name: "FR. COVER BRKT RH", carType: "JG", material: "SPFH590-P", spec: "2.0*144", stock: 629, mQty: 10500, sell: 472, cost: 429, press: "다온", vendor: "다온산업" },
  { code: "TM284-55900", name: "FR. REINF BRKT NO.5", carType: "JG", material: "SPFH590-P", spec: "2.0*154", stock: 201, mQty: 3000, sell: 656, cost: 597, press: "다온", vendor: "다온산업" },
  { code: "TM284-58000", name: "STOPPER BRKT, LH", carType: "JG", material: "SPFH590-P", spec: "3.0*148", stock: 0, mQty: 5000, sell: 205, cost: 187, press: "다온", vendor: "다온산업" },
  { code: "TM284-78000", name: "STOPPER BRKT, RH", carType: "JG", material: "SPFH590-P", spec: "3.0*148", stock: 0, mQty: 5000, sell: 199, cost: 181, press: "다온", vendor: "다온산업" },
  { code: "CM294-60800", name: "S/COVER FRT HOOK-INR", carType: "JG", material: "SPFH590-P", spec: "2.3*108", stock: 275, mQty: 5000, sell: 267, cost: 243, press: "다온", vendor: "다온산업" },
  { code: "8911C-P86A0", name: "CUSH SIDE MBR INR-LH", carType: "LQ2", material: "BLK", spec: "-", stock: 2500, mQty: 5000, sell: 1534, cost: 1042, press: "외주BLK", vendor: "구영테크" },
  { code: "8911C-P86F0", name: "REINF CUSH SIDE MBR", carType: "LQ2", material: "SAPH440-P", spec: "1.8*412", stock: 3000, mQty: 3000, sell: 968, cost: 720, press: "1열", vendor: "-" },
  { code: "CM294-57500", name: "REINF SIDE MBR A-CTR", carType: "JG", material: "SPFC780DP", spec: "2.0*458", stock: 100, mQty: 10500, sell: 1250, cost: 920, press: "2열", vendor: "우신정공" },
];

const coilData = [
  { material: "SPRC440", spec: "0.8*598", weight: 9100, loc: "야적장 A", vendor: "포스코", status: "사용중", cnt: 4, remark: "2,275KG x 4C" },
  { material: "SPCC", spec: "1.2*182", weight: 1035, loc: "야적장 A", vendor: "포스코", status: "입고예정", cnt: 1, remark: "02/09 입고" },
  { material: "SPHC-P", spec: "1.6*257", weight: 3122, loc: "야적장 B", vendor: "현대제철", status: "사용중", cnt: 2, remark: "1,561KG x 2C" },
  { material: "SPFC590", spec: "1.6*310", weight: 2108, loc: "야적장 B", vendor: "포스코", status: "사용중", cnt: 1, remark: "" },
  { material: "SPFC780DP", spec: "2.0*458", weight: 4560, loc: "야적장 C", vendor: "포스코", status: "사용중", cnt: 3, remark: "" },
  { material: "SPFH590-P", spec: "2.0*150", weight: 1604, loc: "야적장 B", vendor: "현대제철", status: "재고", cnt: 2, remark: "" },
  { material: "SAPH440-P", spec: "1.8*412", weight: 2739, loc: "야적장 C", vendor: "포스코", status: "사용중", cnt: 2, remark: "LQ2" },
  { material: "SPPH590-P", spec: "2.6*140", weight: 1800, loc: "야적장 A", vendor: "현대제철", status: "재고", cnt: 1, remark: "" },
  { material: "SPA1590-P", spec: "2.6*332", weight: 2500, loc: "야적장 A", vendor: "포스코", status: "사용중", cnt: 2, remark: "" },
];

const pressLines = [
  { name: "1열 PRESS", status: "가동", code: "8912A-R64A0", pName: "CUSH PNL-OTR, LH", car: "MX5A", progress: 72, oee: 89, target: 3000, actual: 2160, defect: 12, op: "김성수" },
  { name: "2열(우신)", status: "가동", code: "CM284-55100", pName: "ISO FIX BRKT", car: "JG", progress: 85, oee: 93, target: 8700, actual: 7395, defect: 28, op: "박민호" },
  { name: "2열(MIP)", status: "정지", code: "CM294-50100", pName: "SIDE MBR-OTR", car: "JG", progress: 0, oee: 0, target: 1050, actual: 0, defect: 0, op: "-" },
  { name: "3열 PRESS", status: "가동", code: "65986-4F000", pName: "ASSY GUARD BRKT", car: "HR", progress: 58, oee: 86, target: 800, actual: 464, defect: 5, op: "이준혁" },
  { name: "다온(구미)", status: "가동", code: "CM284-50800", pName: "FR. COVER BRKT LH", car: "JG", progress: 45, oee: 82, target: 500, actual: 225, defect: 3, op: "외주" },
];

const workOrders = [
  { id: "WO-260210-001", code: "CM284-55100", name: "ISO FIX BRKT", car: "JG", qty: 8700, line: "2열(우신)", status: "진행중", progress: 85, due: "02-10" },
  { id: "WO-260210-002", code: "8912A-R64A0", name: "CUSH PNL-OTR, LH", car: "MX5A", qty: 3000, line: "1열", status: "진행중", progress: 72, due: "02-10" },
  { id: "WO-260210-003", code: "65986-4F000", name: "ASSY GUARD BRKT", car: "HR", qty: 800, line: "3열", status: "진행중", progress: 58, due: "02-10" },
  { id: "WO-260210-004", code: "CM284-55600", name: "CUSH. PANEL BRKT", car: "JG", qty: 5100, line: "2열(우신)", status: "대기", progress: 0, due: "02-10" },
  { id: "WO-260210-005", code: "CM294-50100", name: "SIDE MBR-OTR", car: "JG", qty: 1050, line: "2열(MIP)", status: "보류", progress: 0, due: "02-11" },
  { id: "WO-260211-001", code: "83961-A3000", name: "ROLLER ARM LWR", car: "TAM", qty: 450, line: "1열", status: "예정", progress: 0, due: "02-11" },
  { id: "WO-260211-002", code: "81769-4H000", name: "BAR-T/GATE UPR", car: "US4", qty: 900, line: "1열", status: "예정", progress: 0, due: "02-12" },
];

const shipments = [
  { id: "SH-001", cust: "기아테크", car: "JG", code: "CM294-50800", name: "S/COVER FRT HOOK-OTR", oQty: 500, sQty: 581, short: -81, due: "02-10", status: "출하완료" },
  { id: "SH-002", cust: "기아테크", car: "JG", code: "CM284-55100", name: "ISO FIX BRKT", oQty: 1000, sQty: 6400, short: -5400, due: "02-10", status: "출하완료" },
  { id: "SH-003", cust: "기아테크", car: "JG", code: "CM284-54400", name: "WASHER PI32.6X2.3T", oQty: 2000, sQty: 70, short: 1930, due: "02-10", status: "부족" },
  { id: "SH-004", cust: "현대모비스", car: "MX5A", code: "8912A-R64A0", name: "CUSH PNL-OTR, LH", oQty: 14400, sQty: 14800, short: 0, due: "02-11", status: "피킹중" },
  { id: "SH-005", cust: "현대모비스", car: "TAM", code: "83961-A3000", name: "ROLLER ARM LWR", oQty: 4510, sQty: 1500, short: 3010, due: "02-12", status: "대기" },
  { id: "SH-006", cust: "기아테크", car: "JG", code: "CM294-60800", name: "S/COVER FRT HOOK-INR", oQty: 1000, sQty: 275, short: 725, due: "02-12", status: "대기" },
  { id: "SH-007", cust: "현대모비스", car: "HR", code: "65986-4F000", name: "ASSY GUARD BRKT", oQty: 3510, sQty: 3510, short: 0, due: "02-13", status: "대기" },
];

const daonItems = [
  { no: 1, code: "CM334-61202", name: "BASE REINF BRKT PATCH NO.6", type: "SEP", price: 158, t: 2.3, w: 108, p: 70, coilP: 1035, mQty: 500, mAmt: 79000 },
  { no: 2, code: "CM334-71202", name: "BASE REINF BRKT PATCH NO.7", type: "SEP", price: 152, t: 2.3, w: 0, p: 0, coilP: 0, mQty: 500, mAmt: 76000 },
  { no: 3, code: "CM284-51000", name: "RR. COVER BRKT", type: "PRO(2)", price: 34, t: 2.0, w: 72, p: 35, coilP: 1035, mQty: 10500, mAmt: 357000 },
  { no: 4, code: "CM284-54400", name: "WASHER PI32.6X2.3T", type: "PRO(3)", price: 27, t: 2.3, w: 104, p: 35, coilP: 920, mQty: 10500, mAmt: 283500 },
  { no: 5, code: "CM284-50800", name: "FR. COVER BRKT LH", type: "단발", price: 506, t: 2.0, w: 144, p: 70, coilP: 1121, mQty: 500, mAmt: 253000 },
  { no: 6, code: "CM284-60800", name: "FR. COVER BRKT RH", type: "단발", price: 472, t: 2.0, w: 144, p: 70, coilP: 1121, mQty: 500, mAmt: 236000 },
  { no: 7, code: "CM284-50801", name: "FR. NON LEGREST COVER LH", type: "단발", price: 490, t: 2.0, w: 144, p: 70, coilP: 1121, mQty: 500, mAmt: 245000 },
  { no: 8, code: "CM284-55700", name: "BACK SUPT BRKT", type: "PRO", price: 78, t: 2.0, w: 116, p: 30, coilP: 1035, mQty: 5000, mAmt: 390000 },
  { no: 9, code: "TM284-55900", name: "FR. REINF BRKT NO.5", type: "단발", price: 656, t: 2.0, w: 154, p: 134, coilP: 1121, mQty: 3000, mAmt: 1968000 },
  { no: 10, code: "TM284-85900", name: "FR. REINF BRKT NO.8", type: "단발", price: 614, t: 2.0, w: 154, p: 126, coilP: 1121, mQty: 3000, mAmt: 1842000 },
  { no: 11, code: "TM284-57301", name: "S-COVER BRKT OTR FRT, LH", type: "SEP", price: 145, t: 1.6, w: 158, p: 57, coilP: 1035, mQty: 5000, mAmt: 725000 },
  { no: 12, code: "TM284-58000", name: "STOPPER BRKT, LH", type: "SEP", price: 205, t: 3.0, w: 148, p: 110, coilP: 1121, mQty: 5000, mAmt: 1025000 },
  { no: 13, code: "TM284-78000", name: "STOPPER BRKT, RH", type: "단발", price: 199, t: 3.0, w: 148, p: 110, coilP: 1121, mQty: 5000, mAmt: 995000 },
  { no: 14, code: "TM284-67301", name: "S-COVER BRKT INR", type: "BLK", price: 170, t: 2.0, w: 154, p: 134, coilP: 1121, mQty: 5000, mAmt: 850000 },
  { no: 15, code: "CM294-60800", name: "S/COVER FRT HOOK-INR", type: "단발", price: 267, t: 2.3, w: 108, p: 70, coilP: 1035, mQty: 5000, mAmt: 1335000 },
  { no: 16, code: "CM294-56000", name: "BRKT-CTR BUCKLE MTG", type: "PRO(2)", price: 196, t: 2.3, w: 108, p: 70, coilP: 1035, mQty: 5000, mAmt: 980000 },
];

const outsourceOrders = [
  { id: "PO-001", vendor: "우신정공", code: "CM284-55600", name: "CUSH. PANEL BRKT", qty: 2816, unit: "KG", due: "02-08", status: "입고완료", inspect: "합격", amt: 2914560 },
  { id: "PO-002", vendor: "우신정공", code: "CM294-56800", name: "REINF SIDE MBR OTR", qty: 989, unit: "KG", due: "02-08", status: "입고완료", inspect: "합격", amt: 1108669 },
  { id: "PO-003", vendor: "우신정공", code: "CM294-66900", name: "REINF SIDE MBR-INR", qty: 1784, unit: "KG", due: "02-08", status: "입고완료", inspect: "합격", amt: 2180048 },
  { id: "PO-004", vendor: "다온산업", code: "CM284-50800", name: "FR. COVER BRKT LH", qty: 500, unit: "EA", due: "02-12", status: "생산중", inspect: "-", amt: 253000 },
  { id: "PO-005", vendor: "다온산업", code: "CM284-60800", name: "FR. COVER BRKT RH", qty: 500, unit: "EA", due: "02-12", status: "생산중", inspect: "-", amt: 236000 },
  { id: "PO-006", vendor: "구영테크", code: "8912A-R64A0", name: "CUSH PNL-OTR, LH", qty: 14000, unit: "EA", due: "02-11", status: "입고대기", inspect: "미검사", amt: 8512000 },
  { id: "PO-007", vendor: "가람", code: "TM284-57301", name: "S-COVER BRKT OTR", qty: 1127, unit: "KG", due: "02-10", status: "운송중", inspect: "-", amt: 1166445 },
];

const vendors = [
  { name: "우신정공", type: "PRESS(2열)", items: 9, dRate: 96, qRate: 98.5, grade: "S", coil: "6,203 KG", sales: "6,203,277" },
  { name: "다온산업(구미)", type: "PRESS(다온)", items: 29, dRate: 89, qRate: 95.2, grade: "A", coil: "5,706 KG", sales: "5,706,000" },
  { name: "구영테크", type: "PRESS/COIL", items: 15, dRate: 92, qRate: 97.8, grade: "A", coil: "-", sales: "13,009,162" },
  { name: "가람", type: "BLK가공", items: 6, dRate: 94, qRate: 96.1, grade: "A", coil: "3,681 KG", sales: "3,681,000" },
  { name: "티엠에스스틸", type: "BLK가공", items: 4, dRate: 85, qRate: 91.0, grade: "B", coil: "1,225 KG", sales: "1,225,000" },
  { name: "삼원스틸", type: "BLK가공", items: 3, dRate: 78, qRate: 88.5, grade: "C", coil: "1,071 KG", sales: "1,071,000" },
];

const salesMonthly = [
  { month: "9월", rev: 125, cost: 82, profit: 43 },
  { month: "10월", rev: 138, cost: 89, profit: 49 },
  { month: "11월", rev: 142, cost: 91, profit: 51 },
  { month: "12월", rev: 155, cost: 98, profit: 57 },
  { month: "1월", rev: 141, cost: 93, profit: 48 },
  { month: "2월", rev: 68, cost: 44, profit: 24 },
];

const dailyProd = Array.from({ length: 10 }, (_, i) => ({ hour: `${6 + i}`, l1: Math.floor(250 + Math.random() * 80), l2: Math.floor(700 + Math.random() * 200), l3: Math.floor(60 + Math.random() * 30) }));
const monthTrend = Array.from({ length: 14 }, (_, i) => ({ date: `${i + 1}`, prod: Math.floor(25000 + Math.random() * 8000), goal: 30000 }));
const defects = [{ name: "크랙", value: 32, color: "#EF4444" }, { name: "치수불량", value: 24, color: "#F59E0B" }, { name: "스크래치", value: 18, color: "#8B5CF6" }, { name: "코일결함", value: 14, color: "#06B6D4" }, { name: "금형마모", value: 8, color: "#EC4899" }, { name: "기타", value: 4, color: "#9CA3AF" }];
const alerts = [
  { type: "danger", msg: "2열(MIP) PRESS 정지 - 금형이동 필요", time: "8분 전" },
  { type: "warning", msg: "CM284-54400 WASHER 재고 70EA - 부족", time: "22분 전" },
  { type: "warning", msg: "TM284-58000 STOPPER BRKT 재고 0EA", time: "30분 전" },
  { type: "success", msg: "SH-001 기아테크 출하 완료 500EA", time: "1시간 전" },
  { type: "info", msg: "다온산업 FR.COVER BRKT 500EA 생산중", time: "2시간 전" },
  { type: "success", msg: "우신정공 코일 입고 완료 6,203KG", time: "3시간 전" },
];
const processFlow = [{ s: "BL", n: "블랭킹" }, { s: "FO", n: "포밍" }, { s: "RE", n: "리스트라이크" }, { s: "PI", n: "피어싱" }, { s: "BU", n: "버링" }, { s: "C.CUT", n: "캠컷" }];

const menuItems = [
  { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { id: "product", label: "제품관리", icon: Package, ch: [{ id: "product-list", label: "품목 마스터" }, { id: "product-coil", label: "코일/원자재" }] },
  { id: "production", label: "생산관리", icon: Factory, ch: [{ id: "prod-order", label: "작업지시" }, { id: "prod-monitor", label: "PRESS 현황" }, { id: "prod-process", label: "공정 관리" }] },
  { id: "shipping", label: "출하/납품", icon: Truck, ch: [{ id: "ship-list", label: "출하 관리" }] },
  { id: "outsource", label: "외주관리", icon: Building2, ch: [{ id: "out-order", label: "외주 발주/입고" }, { id: "out-vendor", label: "협력사 현황" }, { id: "out-daon", label: "다온 정산" }] },
  { id: "sales", label: "매출관리", icon: DollarSign, ch: [{ id: "sales-page", label: "매출/매입 현황" }] },
];

const sMap = { "가동": ["#ECFDF5", "#059669"], "양산": ["#ECFDF5", "#059669"], "진행중": ["#EFF6FF", "#2563EB"], "출하완료": ["#ECFDF5", "#059669"], "합격": ["#ECFDF5", "#059669"], "입고완료": ["#ECFDF5", "#059669"], "완료": ["#ECFDF5", "#059669"], "정지": ["#FEF2F2", "#DC2626"], "보류": ["#FEF2F2", "#DC2626"], "부족": ["#FEF2F2", "#DC2626"], "미정": ["#FEF2F2", "#DC2626"], "대기": ["#F3F4F6", "#6B7280"], "예정": ["#F3F4F6", "#6B7280"], "미검사": ["#F3F4F6", "#6B7280"], "입고예정": ["#FFFBEB", "#D97706"], "입고대기": ["#FFFBEB", "#D97706"], "피킹중": ["#F5F3FF", "#7C3AED"], "운송중": ["#EFF6FF", "#2563EB"], "생산중": ["#ECFEFF", "#0891B2"], "사용중": ["#EFF6FF", "#2563EB"], "재고": ["#ECFDF5", "#059669"] };
function Bdg({ s }) { const [bg, c] = sMap[s] || ["#F3F4F6", "#6B7280"]; return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 9px", borderRadius: 20, background: bg, color: c, fontSize: 11, fontWeight: 600 }}><span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{s}</span>; }
const carC = { JG: "#2563EB", MX5A: "#7C3AED", LQ2: "#0891B2", TAM: "#D97706", HR: "#059669", US4: "#DC2626", NX4A: "#EC4899", ENG: "#F59E0B" };
function CB({ t }) { const c = carC[t] || "#6B7280"; return <span style={{ padding: "1px 7px", borderRadius: 4, fontSize: 10.5, fontWeight: 700, background: c + "18", color: c }}>{t}</span>; }
function PBr({ v, h = 6, c }) { const cl = c || (v >= 80 ? T.success : v >= 40 ? T.primary : T.warning); return <div style={{ width: "100%", height: h, borderRadius: h, background: "#E5E7EB" }}><div style={{ width: `${Math.min(v, 100)}%`, height: "100%", borderRadius: h, background: cl, transition: "width 0.6s" }} /></div>; }
function Cd({ children, style }) { return <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.border}`, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", ...style }}>{children}</div>; }
function Tbl({ cols, data }) { return <div style={{ overflowX: "auto", borderRadius: 10, border: `1px solid ${T.border}`, background: "#fff" }}><table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}><thead><tr style={{ background: "#F8FAFC" }}>{cols.map((c, i) => <th key={i} style={{ padding: "9px 10px", textAlign: c.a || "left", color: T.muted, fontWeight: 600, fontSize: 11, whiteSpace: "nowrap", borderBottom: `1px solid ${T.border}` }}>{c.l}</th>)}</tr></thead><tbody>{data.map((r, ri) => <tr key={ri} style={{ borderBottom: "1px solid #F1F5F9" }}>{cols.map((c, ci) => <td key={ci} style={{ padding: "8px 10px", color: T.text, whiteSpace: "nowrap" }}>{c.r ? c.r(r[c.k], r) : r[c.k]}</td>)}</tr>)}</tbody></table></div>; }
function PgH({ title, sub, children }) { return <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}><div><h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: 0 }}>{title}</h2>{sub && <p style={{ fontSize: 12, color: T.muted, margin: "3px 0 0" }}>{sub}</p>}</div>{children && <div style={{ display: "flex", gap: 6 }}>{children}</div>}</div>; }
function Btn({ icon: I, label, primary }) { return <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 11px", borderRadius: 7, border: primary ? "none" : `1px solid ${T.border}`, cursor: "pointer", background: primary ? T.primary : "#fff", color: primary ? "#fff" : T.text, fontSize: 12, fontWeight: 500 }}>{I && <I size={13} />} {label}</button>; }
const tt = { background: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 11 };

function Dashboard() {
  const kpis = [
    { label: "금일 생산량", value: "10,244", unit: "EA", change: "+5.3%", up: true, icon: Factory, g: "linear-gradient(135deg,#2563EB,#60A5FA)" },
    { label: "PRESS 가동률", value: "87.5", unit: "%", change: "+1.8%", up: true, icon: TrendingUp, g: "linear-gradient(135deg,#059669,#34D399)" },
    { label: "불량률", value: "0.4", unit: "%", change: "-0.2%", up: false, icon: AlertTriangle, g: "linear-gradient(135deg,#D97706,#FBBF24)" },
    { label: "부족품목", value: "4", unit: "건", change: "긴급", up: null, icon: Truck, g: "linear-gradient(135deg,#DC2626,#F87171)" },
  ];
  return (<div>
    <PgH title="생산 현황 대시보드" sub="2026년 2월 10일 (화) | 스마트 팩토리" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 12, marginBottom: 16 }}>
      {kpis.map((k, i) => <Cd key={i} style={{ position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 8, background: k.g, display: "flex", alignItems: "center", justifyContent: "center" }}><k.icon size={15} color="#fff" /></div><div style={{ fontSize: 11, color: T.muted, marginBottom: 5, fontWeight: 500 }}>{k.label}</div><div style={{ display: "flex", alignItems: "baseline", gap: 3 }}><span style={{ fontSize: 24, fontWeight: 800 }}>{k.value}</span><span style={{ fontSize: 11.5, color: T.muted }}>{k.unit}</span></div><div style={{ fontSize: 11, marginTop: 5, color: k.up === false ? T.success : k.up ? T.success : T.danger, display: "flex", alignItems: "center", gap: 3 }}>{k.up !== null && (k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />)}{k.change}</div></Cd>)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 16 }}>
      <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>2월 일별 생산 추이</div><ResponsiveContainer width="100%" height={190}><LineChart data={monthTrend}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="date" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><YAxis tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><Tooltip contentStyle={tt} /><Line type="monotone" dataKey="prod" name="생산량" stroke={T.primary} strokeWidth={2} dot={{ r: 3 }} /><Line type="monotone" dataKey="goal" name="목표" stroke={T.warning} strokeDasharray="5 5" strokeWidth={1.5} dot={false} /></LineChart></ResponsiveContainer></Cd>
      <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>불량 유형</div><ResponsiveContainer width="100%" height={150}><PieChart><Pie data={defects} cx="50%" cy="50%" innerRadius={38} outerRadius={62} paddingAngle={3} dataKey="value">{defects.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><Tooltip contentStyle={tt} /></PieChart></ResponsiveContainer><div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>{defects.map((d, i) => <span key={i} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: T.muted }}><span style={{ width: 6, height: 6, borderRadius: 2, background: d.color }} />{d.name}</span>)}</div></Cd>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 12 }}>
      <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>PRESS 라인 현황</div>{pressLines.map((l, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: i < pressLines.length - 1 ? "1px solid #F1F5F9" : "none" }}><span style={{ width: 80, fontSize: 11, fontWeight: 600 }}>{l.name}</span><Bdg s={l.status} /><CB t={l.car} /><span style={{ fontSize: 10.5, color: T.muted, flex: 1 }}>{l.code}</span><div style={{ width: 70 }}><PBr v={l.progress} /></div><span style={{ fontSize: 11, fontWeight: 600, width: 30, textAlign: "right" }}>{l.progress}%</span></div>)}</Cd>
      <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>실시간 알림</div>{alerts.map((a, i) => { const c = { danger: T.danger, warning: T.warning, success: T.success, info: T.accent }; const bg = { danger: "#FEF2F2", warning: "#FFFBEB", success: "#ECFDF5", info: "#ECFEFF" }; const icons = { danger: AlertTriangle, warning: AlertTriangle, success: CheckCircle, info: Clock }; const Ic = icons[a.type]; return <div key={i} style={{ display: "flex", gap: 7, padding: "7px 0", borderBottom: i < alerts.length - 1 ? "1px solid #F1F5F9" : "none" }}><div style={{ width: 26, height: 26, borderRadius: 6, background: bg[a.type], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic size={12} color={c[a.type]} /></div><div style={{ flex: 1 }}><div style={{ fontSize: 11, color: T.text, lineHeight: 1.45 }}>{a.msg}</div><div style={{ fontSize: 10, color: T.dim, marginTop: 1 }}>{a.time}</div></div></div>; })}</Cd>
    </div>
  </div>);
}

function ProductList() {
  const [search, setSearch] = useState("");
  const filtered = products.filter(p => p.code.toUpperCase().includes(search.toUpperCase()) || p.name.toUpperCase().includes(search.toUpperCase()) || p.carType.toUpperCase().includes(search.toUpperCase()));
  return (<div>
    <PgH title="품목 마스터" sub={`총 ${products.length}개 품목`}><Btn icon={Filter} label="필터" /><Btn icon={Plus} label="품목 등록" primary /></PgH>
    <div style={{ marginBottom: 10, position: "relative" }}><Search size={13} style={{ position: "absolute", left: 10, top: 8, color: T.dim }} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="품번, 품명, 차종 검색..." style={{ width: "100%", padding: "7px 10px 7px 30px", borderRadius: 7, border: `1px solid ${T.border}`, background: "#fff", color: T.text, fontSize: 12, outline: "none", boxSizing: "border-box" }} /></div>
    <Tbl cols={[{ k: "carType", l: "차종", r: v => <CB t={v} /> }, { k: "code", l: "품번", r: v => <span style={{ fontWeight: 600, color: T.primary, fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "material", l: "재질", r: v => <span style={{ fontSize: 11, color: T.muted }}>{v}</span> }, { k: "spec", l: "규격" }, { k: "stock", l: "재고", a: "right", r: v => <span style={{ fontWeight: 600, color: v < 100 ? T.danger : v < 500 ? T.warning : T.text }}>{v.toLocaleString()}</span> }, { k: "sell", l: "매출단가", a: "right", r: v => v.toLocaleString() }, { k: "press", l: "라인" }, { k: "vendor", l: "외주처", r: v => v === "-" ? <span style={{ color: T.dim }}>자체</span> : v }]} data={filtered} />
  </div>);
}

function CoilPage() {
  const tw = coilData.reduce((a, c) => a + c.weight, 0);
  return (<div>
    <PgH title="코일/원자재 재고" sub="야적장 현황"><Btn icon={RefreshCw} label="새로고침" /><Btn icon={Plus} label="입고" primary /></PgH>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>{[{ l: "총 재고", v: `${tw.toLocaleString()} KG`, c: T.primary }, { l: "종류", v: `${coilData.length}종`, c: T.accent }, { l: "입고예정", v: "2건", c: T.warning }].map((s, i) => <Cd key={i}><div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>{s.l}</div><div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></Cd>)}</div>
    <Tbl cols={[{ k: "material", l: "재질", r: v => <span style={{ fontWeight: 600, color: T.primary }}>{v}</span> }, { k: "spec", l: "두께*폭" }, { k: "weight", l: "중량(KG)", a: "right", r: v => <span style={{ fontWeight: 600 }}>{v.toLocaleString()}</span> }, { k: "cnt", l: "코일수", a: "center" }, { k: "loc", l: "위치" }, { k: "vendor", l: "공급사" }, { k: "status", l: "상태", r: v => <Bdg s={v} /> }, { k: "remark", l: "비고", r: v => <span style={{ fontSize: 10.5, color: T.muted }}>{v}</span> }]} data={coilData} />
  </div>);
}

function WorkOrderPage() {
  return (<div>
    <PgH title="작업지시 관리" sub="2026-02-10 ~ 02-12"><Btn icon={Filter} label="필터" /><Btn icon={Plus} label="작업지시" primary /></PgH>
    <Tbl cols={[{ k: "id", l: "지시번호", r: v => <span style={{ fontWeight: 600, color: T.primary, fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "car", l: "차종", r: v => <CB t={v} /> }, { k: "code", l: "품번", r: v => <span style={{ fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "qty", l: "수량", a: "right", r: v => v.toLocaleString() }, { k: "line", l: "라인" }, { k: "due", l: "납기" }, { k: "status", l: "상태", r: v => <Bdg s={v} /> }, { k: "progress", l: "진행률", r: v => <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 70 }}><PBr v={v} /><span style={{ fontSize: 11, fontWeight: 600, width: 26 }}>{v}%</span></div> }]} data={workOrders} />
    <div style={{ marginTop: 16 }}><Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>시간대별 생산실적</div><ResponsiveContainer width="100%" height={190}><BarChart data={dailyProd}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="hour" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><YAxis tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><Tooltip contentStyle={tt} /><Bar dataKey="l1" name="1열" fill={T.primary} radius={[3, 3, 0, 0]} /><Bar dataKey="l2" name="2열(우신)" fill={T.accent} radius={[3, 3, 0, 0]} /><Bar dataKey="l3" name="3열" fill={T.success} radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></Cd></div>
  </div>);
}

function PressMonitor() {
  return (<div>
    <PgH title="PRESS 라인 실시간" sub="라인별 가동 모니터링"><Btn icon={RefreshCw} label="새로고침" /></PgH>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
      {pressLines.map((l, i) => <Cd key={i} style={{ borderLeft: `4px solid ${l.status === "가동" ? T.success : T.danger}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</span><Bdg s={l.status} /></div>
        <div style={{ display: "flex", gap: 5, marginBottom: 6 }}><CB t={l.car} /><span style={{ fontSize: 11.5, color: T.muted }}>{l.code} - {l.pName}</span></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}><div style={{ padding: "5px 7px", borderRadius: 6, background: "#F8FAFC" }}><div style={{ fontSize: 10, color: T.muted }}>목표</div><div style={{ fontSize: 13, fontWeight: 700 }}>{l.target.toLocaleString()}</div></div><div style={{ padding: "5px 7px", borderRadius: 6, background: "#F8FAFC" }}><div style={{ fontSize: 10, color: T.muted }}>실적</div><div style={{ fontSize: 13, fontWeight: 700, color: l.actual > 0 ? T.primary : T.dim }}>{l.actual.toLocaleString()}</div></div></div>
        <div style={{ marginBottom: 4 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}><span style={{ color: T.muted }}>달성률</span><span style={{ fontWeight: 700 }}>{l.progress}%</span></div><PBr v={l.progress} h={7} /></div>
        {l.oee > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginTop: 6, padding: "5px 7px", borderRadius: 6, background: "#F8FAFC" }}><span style={{ color: T.muted }}>OEE</span><span style={{ color: l.oee >= 90 ? T.success : T.warning, fontWeight: 700 }}>{l.oee}%</span></div>}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginTop: 5, color: T.dim }}><span>불량: {l.defect}EA</span><span>{l.op}</span></div>
      </Cd>)}
    </div>
  </div>);
}

function ProcessPage() {
  return (<div>
    <PgH title="공정 관리" sub="PRESS 공정 흐름" />
    <Cd style={{ marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>표준 공정 흐름</div><div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto", padding: "8px 0" }}>{processFlow.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center" }}><div style={{ textAlign: "center", minWidth: 72 }}><div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg,${T.primary},#60A5FA)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px", color: "#fff", fontWeight: 800, fontSize: 12 }}>{p.s}</div><div style={{ fontSize: 11, fontWeight: 600 }}>{p.n}</div></div>{i < processFlow.length - 1 && <div style={{ width: 20, height: 2, background: "#D1D5DB", margin: "0 2px", marginBottom: 16 }} />}</div>)}</div></Cd>
    <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>JG 2열 CUSH 주요 공정</div><Tbl cols={[{ k: "code", l: "품번", r: v => <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: T.primary }}>{v}</span> }, { k: "name", l: "품명" }, { k: "proc", l: "공정" }, { k: "dies", l: "금형수" }, { k: "rem", l: "비고", r: v => <span style={{ fontSize: 10.5, color: T.muted }}>{v}</span> }]} data={[{ code: "CM284-55100", name: "ISO FIX BRKT", proc: "PRO배(복업)", dies: 1, rem: "총생산수당 1500차" }, { code: "CM284-55600", name: "CUSH. PANEL BRKT", proc: "BL-FO-RE-PI", dies: 5, rem: "금형이동 필요" }, { code: "CM294-56800", name: "REINF SIDE MBR OTR", proc: "BL-FO/FL-RE/FL-RE-PI-FO-BU", dies: 7, rem: "코일입고완료" }, { code: "CM294-50100", name: "SIDE MBR-OTR", proc: "BL-FO/FL-RE/FL-RE-PI-BU", dies: 6, rem: "시트작업" }, { code: "CM294-57200", name: "BASE BRKT-CTR", proc: "BL-FO/FL-RE/FL-RE-PI-PI/C.PI-BU", dies: 7, rem: "금형이동" }]} /></Cd>
  </div>);
}

function ShipPage() {
  return (<div>
    <PgH title="출하/납품 관리" sub="발주 대비 재고 파악"><Btn icon={Filter} label="필터" /><Btn icon={Plus} label="출하" primary /></PgH>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>{[{ l: "출하완료", v: "2건", c: T.success }, { l: "진행중", v: "1건", c: T.primary }, { l: "대기", v: "3건", c: T.warning }, { l: "부족경고", v: "2건", c: T.danger }].map((s, i) => <Cd key={i}><div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>{s.l}</div><div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></Cd>)}</div>
    <Tbl cols={[{ k: "id", l: "출하번호", r: v => <span style={{ fontWeight: 600, color: T.primary, fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "cust", l: "고객사" }, { k: "car", l: "차종", r: v => <CB t={v} /> }, { k: "code", l: "품번", r: v => <span style={{ fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "oQty", l: "발주수량", a: "right", r: v => v.toLocaleString() }, { k: "sQty", l: "재고수량", a: "right", r: v => v.toLocaleString() }, { k: "short", l: "부족수량", a: "right", r: v => <span style={{ fontWeight: 700, color: v > 0 ? T.danger : v < 0 ? T.success : T.text }}>{v > 0 ? v.toLocaleString() : v < 0 ? "(" + Math.abs(v).toLocaleString() + ")" : "-"}</span> }, { k: "due", l: "납기" }, { k: "status", l: "상태", r: v => <Bdg s={v} /> }]} data={shipments} />
  </div>);
}

function OutOrder() {
  return (<div>
    <PgH title="외주 발주/입고" sub="외주 발주 및 입고검사"><Btn icon={Filter} label="필터" /><Btn icon={Plus} label="발주" primary /></PgH>
    <Tbl cols={[{ k: "id", l: "발주번호", r: v => <span style={{ fontWeight: 600, color: T.primary, fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "vendor", l: "협력사" }, { k: "code", l: "품번", r: v => <span style={{ fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "qty", l: "수량", a: "right", r: v => v.toLocaleString() }, { k: "unit", l: "단위" }, { k: "due", l: "납기" }, { k: "status", l: "상태", r: v => <Bdg s={v} /> }, { k: "inspect", l: "검사", r: v => v === "-" ? <span style={{ color: T.dim }}>-</span> : <Bdg s={v} /> }, { k: "amt", l: "금액", a: "right", r: v => v > 0 ? v.toLocaleString() : "-" }]} data={outsourceOrders} />
  </div>);
}

function VendorPage() {
  return (<div>
    <PgH title="협력사 현황" sub="외주 성과 평가" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 12 }}>
      {vendors.map((v, i) => <Cd key={i}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}><div><span style={{ fontSize: 13, fontWeight: 700 }}>{v.name}</span><div style={{ fontSize: 10.5, color: T.dim, marginTop: 1 }}>{v.type} | {v.items}개 품목</div></div><span style={{ padding: "2px 10px", borderRadius: 20, fontWeight: 800, fontSize: 12, background: v.grade === "S" ? "#ECFDF5" : v.grade === "A" ? "#EFF6FF" : v.grade === "B" ? "#FFFBEB" : "#FEF2F2", color: v.grade === "S" ? T.success : v.grade === "A" ? T.primary : v.grade === "B" ? T.warning : T.danger }}>{v.grade}등급</span></div>
        {[{ l: "납기준수율", v: `${v.dRate}%`, p: v.dRate, c: v.dRate >= 90 ? T.success : T.warning }, { l: "품질합격률", v: `${v.qRate}%`, p: v.qRate, c: v.qRate >= 95 ? T.success : T.warning }].map((m, j) => <div key={j} style={{ marginBottom: 7 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 2 }}><span style={{ color: T.muted }}>{m.l}</span><span style={{ color: m.c, fontWeight: 600 }}>{m.v}</span></div><PBr v={m.p} h={5} c={m.c} /></div>)}
        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 7, marginTop: 4, fontSize: 11 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ color: T.muted }}>코일</span><span style={{ fontWeight: 500 }}>{v.coil}</span></div><div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: T.muted }}>매출</span><span style={{ fontWeight: 500 }}>{v.sales}</span></div></div>
      </Cd>)}
    </div>
  </div>);
}

function DaonPage() {
  const total = daonItems.reduce((a, c) => a + c.mAmt, 0);
  return (<div>
    <PgH title="다온산업 JG 정산" sub={`${daonItems.length}개 품목 | 월 예상: ${total.toLocaleString()}원`}><Btn icon={FileText} label="정산서" primary /></PgH>
    <Tbl cols={[{ k: "no", l: "순", a: "center" }, { k: "code", l: "품번", r: v => <span style={{ fontWeight: 600, color: T.primary, fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "type", l: "구분", r: v => <span style={{ fontSize: 10.5, padding: "1px 6px", borderRadius: 4, background: v.includes("PRO") ? "#ECFEFF" : v.includes("BLK") ? "#FEF2F2" : "#F3F4F6", color: v.includes("PRO") ? T.accent : v.includes("BLK") ? T.danger : T.muted }}>{v}</span> }, { k: "price", l: "제안가", a: "right", r: v => v.toLocaleString() }, { k: "t", l: "두께", a: "center", r: v => v > 0 ? `${v}T` : "-" }, { k: "w", l: "폭", a: "center", r: v => v > 0 ? v : "-" }, { k: "p", l: "피치", a: "center", r: v => v > 0 ? v : "-" }, { k: "coilP", l: "코일단가", a: "right", r: v => v > 0 ? v.toLocaleString() : "-" }, { k: "mQty", l: "월수량", a: "right", r: v => v.toLocaleString() }, { k: "mAmt", l: "월금액", a: "right", r: v => v.toLocaleString() }]} data={daonItems} />
  </div>);
}

function SalesPage() {
  return (<div>
    <PgH title="매출/매입 현황" sub="월별 추이 (단위: 백만원)" />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>{[{ l: "1월 매출", v: "141M", c: T.primary }, { l: "1월 매입", v: "93M", c: T.muted }, { l: "1월 이익", v: "48M", c: T.success }].map((s, i) => <Cd key={i}><div style={{ fontSize: 11, color: T.muted, marginBottom: 3 }}>{s.l}</div><div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></Cd>)}</div>
    <Cd style={{ marginBottom: 16 }}><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>월별 추이</div><ResponsiveContainer width="100%" height={220}><BarChart data={salesMonthly}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /><XAxis dataKey="month" tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><YAxis tick={{ fill: T.muted, fontSize: 10 }} axisLine={false} /><Tooltip contentStyle={tt} /><Bar dataKey="rev" name="매출" fill={T.primary} radius={[3, 3, 0, 0]} /><Bar dataKey="cost" name="매입" fill="#94A3B8" radius={[3, 3, 0, 0]} /><Bar dataKey="profit" name="이익" fill={T.success} radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></Cd>
    <Cd><div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>품목별 이윤 분석</div><Tbl cols={[{ k: "car", l: "차종", r: v => <CB t={v} /> }, { k: "code", l: "품번", r: v => <span style={{ fontFamily: "monospace", fontSize: 11 }}>{v}</span> }, { k: "name", l: "품명" }, { k: "cost", l: "원가", a: "right", r: v => v.toLocaleString() }, { k: "sell", l: "매출단가", a: "right", r: v => v.toLocaleString() }, { k: "margin", l: "이윤", a: "right", r: v => v.toLocaleString() }, { k: "rate", l: "이윤율", a: "right", r: v => <span style={{ color: v >= 30 ? T.success : v >= 20 ? T.primary : T.warning, fontWeight: 600 }}>{v}%</span> }]} data={[{ car: "MX5A", code: "8912A-R64A0", name: "CUSH PNL-OTR, LH", cost: 608, sell: 1042, margin: 434, rate: 42 }, { car: "MX5A", code: "8912B-R64B0", name: "CUSH PNL-INR, RH", cost: 1091, sell: 1161, margin: 70, rate: 6 }, { car: "TAM", code: "83961-A3000", name: "ROLLER ARM LWR", cost: 1281, sell: 1665, margin: 384, rate: 23 }, { car: "HR", code: "65986-4F000", name: "ASSY GUARD BRKT", cost: 1035, sell: 1414, margin: 379, rate: 27 }, { car: "US4", code: "81769-4H000", name: "BAR-T/GATE UPR", cost: 920, sell: 1199, margin: 279, rate: 23 }, { car: "ENG", code: "21525-3N100P", name: "PLATE BAFFLE", cost: 52, sell: 85, margin: 33, rate: 39 }]} /></Cd>
  </div>);
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [exp, setExp] = useState(new Set(["product", "production", "shipping", "outsource", "sales"]));
  const [sb, setSb] = useState(true);
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const tog = id => { const n = new Set(exp); n.has(id) ? n.delete(id) : n.add(id); setExp(n); };
  const pages = { dashboard: Dashboard, "product-list": ProductList, "product-coil": CoilPage, "prod-order": WorkOrderPage, "prod-monitor": PressMonitor, "prod-process": ProcessPage, "ship-list": ShipPage, "out-order": OutOrder, "out-vendor": VendorPage, "out-daon": DaonPage, "sales-page": SalesPage };
  const Pg = pages[page] || Dashboard;
  const getLabel = () => { for (const m of menuItems) { if (m.id === page) return m.label; if (m.ch) { const c = m.ch.find(c => c.id === page); if (c) return m.label + " > " + c.label; } } return "대시보드"; };

  return (
    <div style={{ display: "flex", height: "100vh", background: T.bg, fontFamily: "'Pretendard','Noto Sans KR',-apple-system,sans-serif", color: T.text, overflow: "hidden" }}>
      <div style={{ width: sb ? 220 : 0, minWidth: sb ? 220 : 0, height: "100%", background: T.sidebar, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", transition: "all 0.2s", overflow: "hidden" }}>
        <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#2563EB,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: "#fff" }}>SF</div>
          <div><div style={{ fontSize: 13, fontWeight: 800 }}>스마트 팩토리</div><div style={{ fontSize: 9, color: T.dim }}>Smart Factory System</div></div>
        </div>
        <nav style={{ flex: 1, padding: "6px 5px", overflowY: "auto" }}>
          {menuItems.map(item => {
            const active = item.id === page || (item.ch && item.ch.some(c => c.id === page));
            const isExp = exp.has(item.id);
            return (<div key={item.id}>
              <div onClick={() => item.ch ? tog(item.id) : setPage(item.id)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 9px", borderRadius: 6, cursor: "pointer", marginBottom: 1, background: active && !item.ch ? "#EFF6FF" : "transparent", color: active ? T.primary : T.muted }}>
                <item.icon size={15} /><span style={{ flex: 1, fontSize: 12, fontWeight: active ? 600 : 400 }}>{item.label}</span>{item.ch && (isExp ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
              </div>
              {item.ch && isExp && <div style={{ marginLeft: 18, borderLeft: `1.5px solid ${T.border}`, marginBottom: 2 }}>{item.ch.map(ch => {
                const ca = ch.id === page;
                return <div key={ch.id} onClick={() => setPage(ch.id)} style={{ padding: "5px 11px", fontSize: 11.5, cursor: "pointer", borderRadius: "0 5px 5px 0", color: ca ? T.primary : T.muted, fontWeight: ca ? 600 : 400, background: ca ? "#EFF6FF" : "transparent", borderLeft: ca ? `2px solid ${T.primary}` : "2px solid transparent", marginLeft: -1.5 }}>{ch.label}</div>;
              })}</div>}
            </div>);
          })}
        </nav>
        <div style={{ padding: "8px 10px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={12} color={T.primary} /></div><div><div style={{ fontSize: 11, fontWeight: 500 }}>최예나 선임</div><div style={{ fontSize: 9, color: T.dim }}>생산관리팀</div></div></div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${T.border}`, background: "#fff", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><button onClick={() => setSb(!sb)} style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, display: "flex", padding: 2 }}>{sb ? <ChevronLeft size={16} /> : <Menu size={16} />}</button><span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{getLabel()}</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 11, color: T.dim, fontFamily: "monospace", background: "#F8FAFC", padding: "2px 7px", borderRadius: 4 }}>{time.toLocaleTimeString("ko-KR")}</span><div style={{ position: "relative", cursor: "pointer" }}><Bell size={15} color={T.muted} /><span style={{ position: "absolute", top: -3, right: -3, width: 6, height: 6, borderRadius: "50%", background: T.danger, border: "2px solid #fff" }} /></div><Settings size={15} color={T.muted} style={{ cursor: "pointer" }} /></div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 16 }}><Pg /></div>
      </div>
    </div>
  );
}
