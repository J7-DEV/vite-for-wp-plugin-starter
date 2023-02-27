import { useState } from 'react'
import type { TYearlyDataType } from '../types'
import { yearlyDataSource } from '@/pages/Check/ScopeI/CheckScopeITable/fakeData'

const useData = () => {
  const [
    dataSource,
    setDataSource,
  ] = useState<TYearlyDataType[]>(yearlyDataSource)

  const handleAdd = (newData: TYearlyDataType[]) => {
    setDataSource((prev) => [
      ...prev,
      ...newData,
    ])
  }

  const handleEdit = (newData: TYearlyDataType[]) => {
    const parentKey = newData[0]?.key.slice(0, -3) || ''
    const parentRecords =
      dataSource.filter((item: TYearlyDataType) =>
        item.key.includes(parentKey),
      ) || []
    const theIndex = dataSource.findIndex(
      (item) => item.key === `${parentKey}-00`,
    )

    setDataSource((prev) => {
      const begin = [...prev].slice(0, theIndex)
      const end = [...prev].slice(theIndex + parentRecords.length)
      return [
        ...begin,
        ...newData.filter((item) => !!item.yearlyAmount),
        ...end,
      ]
    })
  }

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(
      (item: TYearlyDataType) => item.key !== key,
    )
    setDataSource(newData)
  }

  return { dataSource, setDataSource, handleAdd, handleEdit, handleDelete }
}

export default useData
