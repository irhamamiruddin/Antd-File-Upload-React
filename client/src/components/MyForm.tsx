import { FormOutlined } from "@ant-design/icons";
import { Input, Form, Button, Upload, UploadFile } from "antd";
import React, { useEffect, useState } from "react";
import formData from "../modules/formData";
import fileUpload from "../modules/fileUpload";

const MyForm = () => {
	const [form] = Form.useForm();

	const [results, setResults] = useState<any>(null);
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	// Handle when fileList changes
	useEffect(() => {
		console.log("changed fileList", fileList);
		form.setFieldsValue({ attachments: fileList });
	}, [fileList]);

	// Handle form submit, triggered when user clicks submit button
	const handleSubmit = (values: any) => {
		console.log("handleSubmit", values);
		setResults(JSON.stringify(values, null, 4));
		// formData
		// 	.submit(values)
		// 	.then((result) => {
		// 		console.log(result);
		// 		form.resetFields();
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	};

	// Handle file upload request
	const handleUploadRequest = async (info: any) => {
		console.log("handleUploadRequest", info);
		const formData = new FormData();
		formData.append("attachments", info.file);

		await fileUpload
			.upload(formData)
			.then(async (data: any) => {
				info.onSuccess(data, info.file);
				console.log("uploaded data", data);
				// const files = fileList;
				// files.push(data.data[0]);
				// setFileList(files);
				await setFileList([...fileList, data.data]);
			})
			.catch((error: any) => {
				info.onError(error, info.file);
			});
	};

	const handleUploadChange = (info: any) => {
		console.log("handleUploadChange", info);
	};

	const handleBeforeUpload = (file: any) => {
		// Rename duplicate files
		const isDuplicate = fileList.some(
			(existingFile: any) => existingFile.name === file.name
		);
		if (isDuplicate) {
			const newFileName = `${file.name.replace(/\.[^.]+$/, "")}(${
				fileList.length
			}).${file.name.split(".").pop()}`;
			file.name = newFileName;
		}
		return true;
	};

	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<div
				style={{
					background: "#ffffff",
					padding: "20px",
					borderRadius: "5px",
					width: "300px",
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
						// valuePropName="fileList"
						// getValueFromEvent={(e) => {
						// 	console.log("Upload event:", e);
						// 	if (Array.isArray(e)) {
						// 		return e;
						// 	}
						// 	return e && e.fileList;
						// }}
					>
						<Upload
							customRequest={handleUploadRequest}
							// onChange={handleUploadChange}
							// beforeUpload={handleBeforeUpload}
							multiple={true}
							fileList={fileList}
						>
							<Button icon={<FormOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>

					<Form.Item>
						<Button type="primary" onClick={() => form.submit()}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
			<div
				style={{
					background: "#ffffff",
					padding: "20px",
					borderRadius: "5px",
					width: "300px",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<div style={{ fontSize: "24px", lineHeight: "1" }}>Results:</div>
				<div style={{ fontSize: "12px", lineHeight: "1" }}>{results}</div>
			</div>
		</div>
	);
};

export default MyForm;
