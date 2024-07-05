import { Table, TableColumnsType, Tooltip } from "antd";
import TransactionMenu from "../AdminMenu/TransactionMenu";
import Search from "antd/es/transfer/search";
import { useState } from "react";
import { adminAPI } from "../../../../api/admin.api";
import { useQuery } from "@tanstack/react-query";
import { TransData } from "../../../../types/chart.type";

export default function TransactionList() {
    const { data: tranData, refetch } = useQuery<any>({
        queryKey: ['Request'],
        queryFn: () => adminAPI.getTransaction()
    });

    const [searchText, setSearchText] = useState<string>('');
    console.log('searchText',searchText)
    const transformedData: TransData[] = tranData?.map((transaction: any) => ({
        idTran: transaction.id,
        createDate: transaction.createDate,
        status: transaction.status,
        amount: transaction.amount,
        userId: transaction.user.id,
        email: transaction.user.email,
        fullName: transaction.user.fullName,
        phone: transaction.user.phone,
        role: transaction.user.roles,
        address: transaction.user.address
    })) || [];

    const filteredData: TransData[] = transformedData.filter((item: TransData) =>
      item.idTran.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log('filteredData',filteredData)

    const columns: TableColumnsType<any> = [
        {
            title: 'Mã giao dịch',
            dataIndex: 'idTran',
            render: (text) => (
                <Tooltip title={text}>
                    {text.length > 20 ? `${text.slice(0, 20)}...` : text}
                </Tooltip>
            ),
            onFilter: (value, record) =>
                record.fullName.indexOf(value as string) === 0,
            sorter: (a, b) => a.fullName.length - b.fullName.length,
            width: 200,
            fixed: 'left'
        },
        {
            title: 'Ngày giao dịch',
            dataIndex: 'createDate',
            defaultSortOrder: 'descend',
            width: 200
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 200
        },
        {
            title: 'Số tiền nạp',
            dataIndex: 'amount',
            width: 150
        },
        {
            title: 'Id người nạp',
            dataIndex: 'userId',
            render: (text) => (
                <Tooltip title={text}>
                    {text.length > 20 ? `${text.slice(0, 20)}...` : text}
                </Tooltip>
            ),
            width: 200
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 150
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: 150
        },
        {
            title: '',
            dataIndex: 'role',
            width: 150
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: 150
        }
    ];

    const handleSearch = (value: string) => {
        setSearchText(value);
        console.log(value)
    };

    const onChange = () => {} // Placeholder for future implementation

    return (
        <>
            <div className='text-left'>Danh sách giao dịch</div>
            <TransactionMenu
                list='list'
                req=''
                app=''
                rej=''
            />
            <div className='text-left shadow-sm shadow-black border-4 pt-5 h-[629px] rounded-t-xl mt-6'>
                <div className='mb-5'>
                  <input type="text" placeholder="Nhập từ khóa" onChange={(e)=>handleSearch(e.target.value)}></input>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10 }}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'sorter-icon' }}
                    scroll={{ x: 1300, y: 400 }}
                />
            </div>
        </>
    );
}
