import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import FypRow from "./FypRow";


const FypTable = ({ 
  value, 
  cardTitle, 
  cardDescription, 
  tableHeaders, 
  fypProjectsArray 
}) => {
  return (
    <TabsContent value={value}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableHead 
                    key={index} 
                    className={header.className || ""}>
                    {header.content}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {fypProjectsArray.map((fyp, index) => (
                <FypRow key={index} data={fyp} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{fypProjectsArray.length}</strong> of <strong>{fypProjectsArray.length}</strong> FYPs
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default FypTable;
