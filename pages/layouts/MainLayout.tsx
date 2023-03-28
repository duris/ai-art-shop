import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  ReactPropTypes,
} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </>
  );
}
