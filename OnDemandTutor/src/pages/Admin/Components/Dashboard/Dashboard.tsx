import {
    mdiAccountMultiple,
    mdiCartOutline,
  } from '@mdi/js'
import CardBox from "../CardBox";
import ChartCard from '../ChartCard';
interface ChartData {
    name: string;
    date: string;
    revenue: number;
    month: number;
    year: number;
  }
  
  const initialData: ChartData[] = [
      { name: 'Tuần 1', date: '01/01/2024 - 07/01/2024', revenue: 2000000, month: 1, year: 2024 },
      { name: 'Tuần 2', date: '08/01/2024 - 14/01/2024', revenue: 2200000, month: 1, year: 2024 },
      { name: 'Tuần 3', date: '15/01/2024 - 21/01/2024', revenue: 1240000, month: 1, year: 2024 },
      { name: 'Tuần 4', date: '22/01/2024 - 31/01/2024', revenue: 1582764, month: 1, year: 2024 },
      { name: 'Tuần 1', date: '01/02/2024 - 07/02/2024', revenue: 2548374, month: 2, year: 2024 },
      { name: 'Tuần 2', date: '08/02/2024 - 14/02/2024', revenue: 1527853, month: 2, year: 2024 },
      { name: 'Tuần 3', date: '15/02/2024 - 21/02/2024', revenue: 2543179, month: 2, year: 2024 },
      { name: 'Tuần 4', date: '22/02/2024 - 29/02/2024', revenue: 1624356, month: 2, year: 2024 },
      { name: 'Tuần 1', date: '01/03/2024 - 07/03/2024', revenue: 1240000, month: 3, year: 2024 },
      { name: 'Tuần 2', date: '08/03/2024 - 14/03/2024', revenue: 2431679, month: 3, year: 2024 },
      { name: 'Tuần 3', date: '15/03/2024 - 21/03/2024', revenue: 1524637, month: 3, year: 2024 },
      { name: 'Tuần 4', date: '22/03/2024 - 31/03/2024', revenue: 1875342, month: 3, year: 2024 },
      { name: 'Tuần 1', date: '01/04/2024 - 07/04/2024', revenue: 975436, month: 4, year: 2024 },
      { name: 'Tuần 2', date: '08/04/2024 - 14/04/2024', revenue: 1006520, month: 4, year: 2024 },
      { name: 'Tuần 3', date: '15/04/2024 - 21/04/2024', revenue: 8762537, month: 4, year: 2024 },
      { name: 'Tuần 4', date: '22/04/2024 - 30/04/2024', revenue: 1262834, month: 4, year: 2024 },
      { name: 'Tuần 1', date: '01/05/2024 - 07/05/2024', revenue: 1579854, month: 5, year: 2024 },
      { name: 'Tuần 2', date: '08/05/2024 - 14/05/2024', revenue: 2023456, month: 5, year: 2024 },
      { name: 'Tuần 3', date: '15/05/2024 - 21/05/2024', revenue: 1207653, month: 5, year: 2024 },
      { name: 'Tuần 4', date: '22/05/2024 - 31/05/2024', revenue: 1987542, month: 5, year: 2024 },
      { name: 'Tuần 1', date: '01/06/2024 - 07/06/2024', revenue: 2536234, month: 6, year: 2024 },
      { name: 'Tuần 2', date: '08/06/2024 - 14/06/2024', revenue: 2431679, month: 6, year: 2024 },
      { name: 'Tuần 3', date: '15/06/2024 - 21/06/2024', revenue: 2548374, month: 6, year: 2024 },
      { name: 'Tuần 4', date: '22/06/2024 - 30/06/2024', revenue: 1624356, month: 6, year: 2024 },
    ];
export default function Dashboard() {
  
    return ( <div>
        <div className='flex gap-12 mb-10 w-11/12'>
            <CardBox
                icon={mdiAccountMultiple}
                iconColor="success"
                number={512} // đổ data vào đây
                label="Học Sinh"
            />
            <CardBox
                icon={mdiAccountMultiple}
                iconColor="success"
                number={512}// đổ data vào đây
                label="Gia sư"
            />
            <CardBox
                icon={mdiCartOutline}
                iconColor="success"
                number={15000000}// đổ data vào đây
                numberSuffix="VNĐ"
                label="Lợi nhuận của tháng này"
            />
        </div>
        <div className='w-11/12 bg-slate-50 p-3 rounded-lg shadow-md'>
            <div className='text-left font-bold mb-10'>Doanh Thu</div>
            <ChartCard
                dataChart ={initialData}// đổ data vào đây
            />
        </div>
             
    </div> );
}

