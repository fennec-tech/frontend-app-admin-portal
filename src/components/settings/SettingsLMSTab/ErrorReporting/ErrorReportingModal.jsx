import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ActionRow, ModalDialog, Tab, Tabs,
} from '@edx/paragon';
import ContentMetadataTable from './ContentMetadataTable';
import LearnerMetadataTable from './LearnerMetadataTable';

const ErrorReportingModal = ({
  isOpen, close, config, enterpriseCustomerUuid,
}) => {
  const [key, setKey] = useState('contentMetadata');
  // notification for tab must be a non-empty string to appear
  const contentError = config?.lastContentSyncErroredAt == null ? null : ' ';
  const learnerError = config?.lastLearnerSyncErroredAt == null ? null : ' ';
  return (
    <ModalDialog
      title="Error Reporting Modal"
      isOpen={isOpen}
      onClose={close}
      size="xl"
      hasCloseButton
      isFullscreenOnMobile
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {config?.displayName} Sync History
        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="contentMetadata" title="Content Metadata" notification={contentError}>
            <h4 className="mt-4">Most recent data transmission</h4>
            From edX for Business to {config?.displayName}
            <ContentMetadataTable enterpriseCustomerUuid={enterpriseCustomerUuid} config={config} />
          </Tab>
          <Tab eventKey="learnerActivity" title="Learner Activity" notification={learnerError}>
            <h4 className="mt-4">Most recent data transmission</h4>
            From edX for Business to {config?.displayName}
            <LearnerMetadataTable enterpriseCustomerUuid={enterpriseCustomerUuid} config={config} />
          </Tab>
        </Tabs>
      </ModalDialog.Body>

      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="primary">
            Close
          </ModalDialog.CloseButton>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

ErrorReportingModal.defaultProps = {
  config: null,
};

ErrorReportingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  config: PropTypes.shape({
    id: PropTypes.number,
    channelCode: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    lastContentSyncErroredAt: PropTypes.string.isRequired,
    lastLearnerSyncErroredAt: PropTypes.string.isRequired,
  }),
  enterpriseCustomerUuid: PropTypes.string.isRequired,
};

export default ErrorReportingModal;
