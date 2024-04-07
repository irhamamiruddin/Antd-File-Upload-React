import { FormOutlined } from "@ant-design/icons";
import { Input, Form, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import formData from "../modules/formData";
import fileUpload from "../modules/fileUpload";

const MyForm = () => {
	const [form] = Form.useForm();
	// const [fileList, setFileList] = useState<any>([]);

	const handleSubmit = (values: any) => {
		console.log("handleSubmit", values);
		// values.attachments = fileList;
		formData
			.submit(values)
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const normFile = (e: any) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	const handleUploadRequest = async (info: any) => {
		const formData = new FormData();
		formData.append("file", info.file);
		const filename = info.file.name;

		const imgUUID = filename.split(".").pop();
		formData.append("uuid", imgUUID);
		console.log("handleUploadRequest", formData);

		// setFileList([...fileList]);

		fileUpload
			.upload(formData)
			.then((data: any) => {
				info.onSuccess(data, info.file);
				form.setFieldValue("attachments", data.data);
			})
			.catch((error: any) => {
				info.onError(error, info.file);
			});
	};

	const handleUploadChange = (info: any) => {
		// Update form values with uploaded file list
		form.setFieldsValue({ attachments: info.fileList });
	};

	return (
		<div
			style={{
				background: "#ffffff",
				padding: "20px",
				borderRadius: "5px",
			}}
		>
			<Form name="basic" form={form} onFinish={handleSubmit}>
				<Form.Item
					label="Name"
					name="name"
					rules={[{ required: true, message: "Please input your name!" }]}
				>
					<Input placeholder="Enter name" />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[{ required: true, message: "Please input your email!" }]}
				>
					<Input placeholder="Enter email" />
				</Form.Item>

				<Form.Item
					label="Upload File"
					valuePropName="fileList"
					getValueFromEvent={normFile}
				>
					<Upload
						customRequest={handleUploadRequest}
						onChange={handleUploadChange}
						multiple={true}
					>
						<Button icon={<FormOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default MyForm;
