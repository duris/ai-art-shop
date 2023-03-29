import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  ReactPropTypes,
} from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <ChakraProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </ChakraProvider>
    </>
  );
}
