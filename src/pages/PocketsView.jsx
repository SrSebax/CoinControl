import React from "react";
import Layout from "../components/Layout";
import PageHeading from "../components/PageHeading";

export default function PocketsView() {
  return (
    <Layout>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-6">
        <div className="text-center sm:text-left">
          <PageHeading title="Registrar bolsillos" />
        </div>
      </div>
    </Layout>
  );
}