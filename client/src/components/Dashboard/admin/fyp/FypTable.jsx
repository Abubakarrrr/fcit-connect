import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import FypAdminRow from "./FypAdminRow";

const FypTable = ({
  value,
  cardTitle,
  cardDescription,
  tableHeaders,
  projects,
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
                  <TableHead key={index} className={header.className || ""}>
                    {header.content}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects &&
                projects?.length > 0 &&
                projects?.map((project, index) => (
                  <FypAdminRow key={index} project={project} />
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{projects?.length}</strong> of{" "}
            <strong>{projects?.length}</strong> FYPs
          </div>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default FypTable;
