import { FormOutlined } from "@ant-design/icons";
import { Input, Form, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import formData from "../modules/formData";
import fileUpload from "../modules/fileUpload";

const MyForm = () => {
	const [form] = Form.useForm();

	// Handle form submit, triggered when user clicks submit button
	const handleSubmit = (values: any) => {
		console.log("handleSubmit", values);
		formData
			.submit(values)
			.then((result) => {
				console.log(result);
				form.resetFields();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// Handle file upload request
	const handleUploadRequest = async (info: any) => {
		const formData = new FormData();
		formData.append("attachments", info.file);

		await fileUpload
			.upload(formData)
			.then((data: any) => {
				info.onSuccess(data, info.file);
				form.setFieldValue("attachments", data.data);
				console.log("handleUploadRequest", data.data);
			})
			.catch((error: any) => {
				info.onError(error, info.file);
			});
	};

	const handleUploadChange = (info: any) => {
		console.log("handleUploadChange", info);
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
			<Form form={form} onFinish={handleSubmit}>
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
					name="attachments"
					valuePropName="fileList"
					getValueFromEvent={(e) => {
						console.log("Upload event:", e);
						if (Array.isArray(e)) {
							return e;
						}
						return e && e.fileList;
					}}
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
