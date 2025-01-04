import React from "react";
import { Spinner } from "./ui/spinner";
import { Modal, ModalBody, ModalContent, ModalProps } from "@nextui-org/react";
type Props = Omit<ModalProps, "children"> & {
  message?: string;
};

const LoaderOverlay = ({ message, ...props }: Props) => {
  return (
    <Modal {...props}>
      <ModalContent>
        {() => (
          <>
            <ModalBody className="flex flex-col items-center justify-center">
              <Spinner size="medium" className="text-white" />
              <h2 className="text-white text-lg mt-4">
                {message ?? "Loading..."}
              </h2>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoaderOverlay;
