import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import ProjectsImportButton from '@/components/ProjectsImportButton'
import { Link } from '@tanstack/react-location'

const ProjectsCompanyCreateButton = () => {
	return (
		<div className='border-2 border-gray-300 h-full rounded-lg border-dashed flex flex-col justify-center items-center'>
			<Link to='create' className='text-center'>
				<PlusOutlined className='text-gray-300' style={{ fontSize: 48 }} />
				<div className='text-gray-300' style={{ marginTop: 24 }}>新增公司資料</div>
			</Link>
			<div className='absolute bottom-8'>
				<ProjectsImportButton />
			</div>
		</div>
	)
}

export default ProjectsCompanyCreateButton