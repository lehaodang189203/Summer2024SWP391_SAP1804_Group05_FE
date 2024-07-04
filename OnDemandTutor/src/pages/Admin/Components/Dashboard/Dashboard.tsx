import {
    mdiAccountMultiple,
    mdiCartOutline,
  } from '@mdi/js'
import CardBox from "../CardBox";
import ChartCard from '../ChartCard';
import { adminAPI } from '../../../../api/admin.api';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [amountStudents, setAmountStudents] = useState<number>(0);
  const [amountTutors, setAmountTutors] = useState<number>(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(0);
  const [revenueData, setRevenueData] = useState<ChartData[]>([]);

  console.log('revenueData ban đầu ',revenueData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [students, tutors, revenue, yearlyRevenue] = await Promise.all([
          adminAPI.getAmountStudents(),
          adminAPI.getAmountTutors(),
          adminAPI.getMonthlyRevenue(),
          adminAPI.getRevenueByYear(2024),// vẫn đang lấy data cứng =))
        ]);
        setAmountStudents(students);
        setAmountTutors(tutors);
        setMonthlyRevenue(revenue);
        setRevenueData(yearlyRevenue);
        console.log('revenueData trong apui ',yearlyRevenue)
      } catch (error) {
        console.error("Lỗi khi lấy data", error);
      }
    };

    fetchData();
  }, []);

  
    return (
      <div>
        <div className="flex gap-12 mb-10 w-11/12">
          <CardBox
            icon={mdiAccountMultiple}
            iconColor="success"
            number={amountStudents}
            label="Học Sinh"
          />
          <CardBox
            icon={mdiAccountMultiple}
            iconColor="success"
            number={amountTutors}
            label="Gia sư"
          />
          <CardBox
            icon={mdiCartOutline}
            iconColor="success"
            number={monthlyRevenue}
            numberSuffix="VNĐ"
            label="Lợi nhuận của tháng này"
          />
        </div>
        <div className="w-11/12 bg-slate-50 p-3 rounded-lg shadow-md">
          <div className="text-left font-bold mb-10">Doanh Thu</div>
          <ChartCard dataChart={revenueData} />
        </div>
      </div>
    );
  }
