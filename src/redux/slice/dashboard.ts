// src/redux/slices/paymentLogsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/apiInterceptor';

// Interfaces matching the extended API response

interface Stats {
  total_earned: number;
  total_transactions: number;
  average_transaction: number;
  total_refunded: number;
  failed_transactions: number;
  success_ratio: number;
}

interface LineChartEntry {
  day: string;
  total: number;
}

interface PieChartEntry {
  payment_gateway_name: string;
  total: number;
}

interface BarChartEntry {
  day: string;
  count: number;
}

interface WeekdayStat {
  weekday: number; // 1-7 (Sunday-Saturday)
  total_amount: number;
  transaction_count: number;
}

interface MonthlyRevenue {
  month: string; // ISO month date string
  total_amount: number;
  transaction_count:number;
}

// interface TopCustomer {
//   customer_id: number | null;
//   total: number;
//   transactions: number;
// }

interface GatewayStat {
  payment_gateway_name: string;
  total: number;
  success: number;
  success_rate: number;
}

interface HourlyTransaction {
  hour: number; // 0-23
  count: number;
}

export interface PaymentAnalytics {
  stats: Stats;
  line_chart: LineChartEntry[];
  pie_chart: PieChartEntry[];
  bar_chart: BarChartEntry[];
  weekday_stats: WeekdayStat[];
  monthly_revenue: MonthlyRevenue[];
  // top_customers: TopCustomer[];
  gateway_stats: GatewayStat[];
  hourly_transactions: HourlyTransaction[];
}

// State interface
interface PaymentLogsState {
  logs: PaymentAnalytics | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
  loading: boolean;
}

const initialState: PaymentLogsState = {
  logs: null,
  status: 'idle',
  error: null,
  loading: false,
};

// Async thunk to fetch payment logs data
export const fetchPaymentLogs = createAsyncThunk<
  PaymentAnalytics,
  void,
  { rejectValue: string }
>(
  'paymentLogs/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/dashboard'); // Adjust endpoint if needed
      return response.data.data as PaymentAnalytics;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const paymentLogsSlice = createSlice({
  name: 'paymentLogs',
  initialState,
  reducers: {
    clearPaymentLogs(state) {
      state.logs = null;
      state.error = null;
      state.status = 'idle';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentLogs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchPaymentLogs.fulfilled, (state, action: PayloadAction<PaymentAnalytics>) => {
        state.status = 'success';
        state.logs = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch payment logs';
        state.loading = false;
      });
  },
});

export const { clearPaymentLogs } = paymentLogsSlice.actions;

export default paymentLogsSlice.reducer;
