import { useContext } from 'react'
import { Input, InputNumber, Form, Row, Col } from 'antd'
import { months } from '@/utils'
import FormGWPSelect from '@/components/FormGWPSelect'
import FormUnitSelect from '@/components/FormUnitSelect'
import { FormContext } from '@/pages/Check/ScopeI/CheckScopeITable/Table/components/AddRecordButton'
import { TableDataContext } from '@/pages/Check/ScopeI/CheckScopeITable'

const AddGWPMonthlyFormItem = () => {
  const { validating } = useContext(FormContext)
  const { groupIndex } = useContext(TableDataContext)

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name={[
              groupIndex,
              'gwp',
            ]}
            className="w-full"
            rules={[
              {
                required: validating,
                message: '請選擇溫室氣體',
              },
            ]}
          >
            <FormGWPSelect
              className="rounded-[6px]"
              name={[
                groupIndex,
                'gwp',
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[
              groupIndex,
              'unit',
            ]}
            className="w-full"
            initialValue="kg"
            rules={[
              {
                required: validating,
                message: '請選擇單位',
              },
            ]}
          >
            <FormUnitSelect
              className="rounded-l-[6px]"
              name={[
                groupIndex,
                'unit',
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          {months.map((month, index: number) =>
            index < 6 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    groupIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
        <Col span={12}>
          {months.map((month, index: number) =>
            index > 5 ? (
              <Input.Group
                compact
                className="mb-4"
                key={`month-${month.value}`}
              >
                <Form.Item
                  name={[
                    groupIndex,
                    'monthlyAmount',
                    month.value,
                  ]}
                  className="w-full mb-0"
                  initialValue={0}
                  rules={[
                    {
                      required: validating,
                      message: '請輸入月排放量',
                    },
                  ]}
                >
                  <InputNumber
                    addonBefore={<p className="m-0 w-16">{month.label}</p>}
                    className="w-full"
                    min={0}
                  />
                </Form.Item>
              </Input.Group>
            ) : null,
          )}
        </Col>
      </Row>
    </>
  )
}

export default AddGWPMonthlyFormItem
