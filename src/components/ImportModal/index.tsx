import React from 'react';
import ImportExcelForm from './ImportExcelForm';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

export interface IImportModalProps extends ModalProps {
  uploadType: string;
  templateUrl: string;
  templateTitle: string;
  uploadUrl: string;
  onSubmit?: () => void;
}
export default function ImportModal(props: IImportModalProps) {
  const {
    uploadType,
    templateUrl,
    uploadUrl,
    templateTitle,
    onSubmit,
    ...otherProps
  } = props;
  return (
    <Modal
      title="批量上传"
      width="650px"
      footer={null}
      destroyOnClose
      {...otherProps}
    >
      <ImportExcelForm
        uploadType={uploadType}
        templateUrl={templateUrl}
        uploadUrl={uploadUrl}
        templateTitle={templateTitle}
        onCancel={props.onCancel}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
