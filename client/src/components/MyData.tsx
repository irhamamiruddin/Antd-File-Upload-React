import React, { useEffect, useState } from "react";
import formData from "../modules/formData";
import { Table } from "antd";

function MyData() {
	const [data, setData] = useState<any>([]);
	useEffect(() => {
		formData
			.getData()
			.then((result: any) => {
				console.log("data", result.data);
				setData(result.data);
			})
			.catch((error: any) => {
				console.error(error);
			});
	}, []);

	const columns: any = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Attachments",
			dataIndex: "attachments",
			key: "attachments",
			render: (attachments: any) => (
				<>
					{attachments.map((attachment: any) => {
						return (
							<div key={attachment.file_name}>
								<a href={attachment.file_path} target="_blank" rel="noreferrer">
									{attachment.file_name}
								</a>
							</div>
						);
					})}
				</>
			),
		},
	];

	return (
		<div>
			<Table dataSource={data} columns={columns} pagination={false} />
		</div>
	);
}

export default MyData;
