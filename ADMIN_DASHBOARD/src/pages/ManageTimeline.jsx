import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '../components/ui/table'
import { Tabs, TabsContent } from '../components/ui/tabs'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { deleteTimeline, getAllTimeline, resetTimelineSlice, clearAllTimelineErrors } from '../store/slices/timelineSlice'
const ManageTimeline = () => {
  const navigate = useNavigate()
  const handleReturnToDashboard = () => {
    navigate("/");
  };
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const dispatch = useDispatch()
  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllTimelineErrors())
    }
    if (message) {
      toast.success(message)
      dispatch(resetTimelineSlice())
      dispatch(getAllTimeline())

    }
  }, [dispatch, loading, error])

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>
                  Manage Your TimeLine
                </CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="md:table-cell">Description</TableHead>
                      <TableHead className="md:table-cell">From</TableHead>
                      <TableHead className="md:table-cell">To</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeline.length > 0 ? (
                      timeline.map((element) => {
                        return (
                          <TableRow className='bg-accent' key={element._id}>
                            <TableCell className="font-medium">
                              {element.title}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.description}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.timeline.from}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.timeline.to ? element.timeline.to : "____"}
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <button
                                className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                onClick={() => handleDeleteTimeline(element._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow className="text-2xl">
                        <TableCell>You have not added any timeline.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default ManageTimeline