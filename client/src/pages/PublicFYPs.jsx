import FYPsListing from "@/components/Home/FYPsListing";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";
import React from "react";

const PublicFYPs = () => {
  return (
    <Layout>
      <SearchWithKeywords />
      <FYPsListing />
    </Layout>
  );
};

export default PublicFYPs;
