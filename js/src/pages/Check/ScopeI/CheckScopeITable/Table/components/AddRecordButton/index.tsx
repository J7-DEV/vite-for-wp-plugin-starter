import { createContext, useContext, useState, useEffect } from 'react'
import { Button, Modal, Input, Radio, Form } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import AddGWPYearlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPYearlyFormItem'
import AddGWPMonthlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPMonthlyFormItem'
import AddGWPHourlyFormItem from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddGWPHourlyFormItem'
import type { TYearlyDataType } from '@/pages/Check/ScopeI/CheckScopeITable/Table/types'
import { nanoid } from 'nanoid'
import { gwpMapping, convertUnitToTons } from '@/utils'
import type { TUnit } from '@/types'
import { ProjectContext } from '@/pages/Check'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

export const FormContext = createContext<any | null>(null)
const AddRecordButton = () => {
  const form = Form.useFormInstance()
  const { scopes, setScopes } = useContext(ProjectContext)
  const { groupIndex, groupKey } = useContext(TableDataContext)
  const scopeIGroups = scopes?.scopeI || []
  const group = scopeIGroups.find((theGroup) => theGroup.groupKey === groupKey)
  const dataSource = group?.dataSource || []

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false)

  const [
    validating,
    setValidating,
  ] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
    // TODO set reset field name
  }

  const handleData = () => {
    const formData = form.getFieldsValue()[groupIndex]
    console.log('formData', formData)

    const getYearlyAmount = (theFormData: any) => {
      switch (theFormData?.period) {
        case 'yearly':
          return convertUnitToTons({
            value: theFormData.yearlyAmount ?? 0,
            unit: theFormData.unit,
          })
        case 'monthly':
          return convertUnitToTons({
            value: (theFormData?.monthlyAmount ?? []).reduce(
              (acc: number, cur: number) => acc + cur,
              0,
            ),
            unit: theFormData.unit,
          })
        case 'hourly':
          return convertUnitToTons({
            value: (theFormData.hourlyAmount ?? 0) * (theFormData.hours ?? 0),
            unit: theFormData.unit,
          })
        default:
          return 0
      }
    }
    const yearlyAmount = getYearlyAmount(formData)

    const ar5 = gwpMapping.find((gwp) => gwp?.value === formData?.gwp)?.ar5 || 0

    const carbonTonsPerYear = yearlyAmount * ar5

    const theFormatRecord: TYearlyDataType = {
      key: nanoid(),
      equipment: formData?.equipment,
      gwp: formData.gwp,
      yearlyAmount,
      ar5,
      co2e: carbonTonsPerYear,
      carbonTonsPerYear,
      period: formData?.period,
      monthlyAmount:
        formData?.period === 'monthly' ? formData.monthlyAmount : [],
      hourlyAmount: formData?.period === 'hourly' ? formData.hourlyAmount : [],
      unit: formData.unit,
    }

    return [
      ...dataSource,
      theFormatRecord,
    ]
  }

  // TODO
  const handleModalOk = () => {
    setValidating(true)
    form
      .validateFields()
      .then((_values) => {
        setValidating(false)
        setIsModalOpen(false)
        const formData = form.getFieldsValue()
        const newDataSource = handleData()
        // const scopeI = JSON.stringify({
        //   ...fetchMetaProjectData,
        //   dataSources: [
        //     fetchDataSource,
        //     ...newDataSources,
        //   ],
        // })
        // useUpdate({
        //   resource: 'carbon-project',
        //   id:postId,
        //   args: {
        //     meta: {
        //       project_data,
        //     },
        //   },
        // })
        console.log('newDataSources', newDataSource)

        const newScopes = JSON.parse(JSON.stringify(scopes))

        newScopes.scopeI[groupIndex].dataSource = newDataSource

        setScopes(newScopes)
      })
      .catch((err) => {
        console.log('Validate Failed:', err)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const period = Form.useWatch(
    [
      groupIndex,
      'period',
    ],
    form,
  )

  // TODO
  useEffect(() => {
    form.resetFields([
      [
        groupIndex,
        'yearlyAmount',
      ],
      [
        groupIndex,
        'monthlyAmount',
      ],
      [
        groupIndex,
        'hourlyAmount',
      ],
      [
        groupIndex,
        'hours',
      ],
    ])
  }, [period])

  return (
    <>
      <Button onClick={showModal} type="default" className="mt-4">
        <FolderAddOutlined className="mr-2" />
        新增設備
      </Button>
      <Modal
        title="新增設備"
        open={isModalOpen}
        onOk={handleModalOk}
        centered
        width={600}
        className="cc-modal"
        onCancel={handleCancel}
        okText="新增設備"
        cancelText="取消"
      >
        <Form
          form={form}
          onFieldsChange={() => {
            setValidating(false)
          }}
        >
          <Form.Item
            // hasFeedback={true}
            name={[
              groupIndex,
              'equipment',
            ]}
            rules={[{ required: validating, message: '請輸入設備名稱' }]}
          >
            <Input className="mt-8" addonBefore="設備名稱" />
          </Form.Item>

          <Form.Item
            name={[
              groupIndex,
              'period',
            ]}
            initialValue="yearly"
          >
            <Radio.Group className="w-full mt-8" buttonStyle="solid">
              <Radio.Button className="w-1/3 text-center" value="yearly">
                年碳排放
              </Radio.Button>
              <Radio.Button className="w-1/3 text-center" value="monthly">
                月碳排放
              </Radio.Button>
              <Radio.Button className="w-1/3 text-center" value="hourly">
                每小時碳排放
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <FormContext.Provider value={{ validating }}>
            {period === 'yearly' && <AddGWPYearlyFormItem />}
            {period === 'monthly' && <AddGWPMonthlyFormItem />}
            {period === 'hourly' && <AddGWPHourlyFormItem />}
          </FormContext.Provider>
        </Form>
      </Modal>
    </>
  )
}

export default AddRecordButton
