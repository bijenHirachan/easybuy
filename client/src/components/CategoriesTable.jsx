import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getAllCategories,
} from "../redux/actions/categoryActions";

const CategoriesTable = () => {
  const [category, setCategory] = useState({ _id: "", title: "" });

  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  const cancelRef = useRef();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { loading, categories, error, message, totalPages } = useSelector(
    (state) => state.category
  );

  const deleteCategoryHandler = async () => {
    await dispatch(deleteCategory(category._id));
    await dispatch(getAllCategories(currentPage));
  };

  const prevPageHandler = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const setCategoryHandler = (cat) => {
    setCategory(cat);
    onOpen();
  };

  useEffect(() => {
    dispatch(getAllCategories(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (message) onClose();
  }, [message]);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {category.title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={loading}
                onClick={deleteCategoryHandler}
                colorScheme="red"
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Table>
        <Thead>
          <Tr>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories &&
            categories.length > 0 &&
            categories.map((cat) => (
              <Tr key={cat._id}>
                <Td>{cat.title}</Td>
                <Td>
                  <IconButton
                    variant={"link"}
                    color={"tertiary.dark"}
                    icon={<RiDeleteBin6Line />}
                    onClick={() => setCategoryHandler(cat)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td colSpan={2}>
              <HStack justifyContent={"space-between"}>
                <Button
                  variant={"outline"}
                  rounded={0}
                  size={"xs"}
                  isDisabled={currentPage === 0}
                  onClick={prevPageHandler}
                >
                  Prev
                </Button>
                <Button
                  variant={"outline"}
                  rounded={0}
                  size={"xs"}
                  isDisabled={currentPage === totalPages - 1}
                  onClick={nextPageHandler}
                >
                  Next
                </Button>
              </HStack>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};
// const CategoriesTable = () => {
//   const [id, setId] = useState("");

//   const dispatch = useDispatch();

//   const cancelRef = useRef()

//   const { isOpen, onClose, onOpen } = useDisclosure();

//   const { loading, categories, error, message } = useSelector((state) => state.category);

//   const deleteCategoryHandler = async () => {
//     await dispatch(deleteCategory(id));
//   };

//   const setCategoryHandler = (cat) => {
//     setId(cat._id);
//     onOpen();
//   };

//   useEffect(() => {
//     dispatch(getAllCategories());
//   }, []);

//   useEffect(() => {
//     id(message){
//         onClose()
//     }
//   },[message])

//   return (
//     <>
//       <AlertDialog
//         isOpen={isOpen}
//         leastDestructiveRef={cancelRef}
//         onClose={onClose}
//       >
//         <AlertDialogOverlay>
//           <AlertDialogContent>
//             <AlertDialogHeader fontSize="lg" fontWeight="bold">
//               Delete Customer
//             </AlertDialogHeader>

//             <AlertDialogBody>
//               Are you sure? You can't undo this action afterwards.
//             </AlertDialogBody>

//             <AlertDialogFooter>
//               <Button ref={cancelRef} onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button onClick={deleteCategoryHandler} colorScheme="red" ml={3}>
//                 Delete
//               </Button>
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialogOverlay>
//       </AlertDialog>

//       <Table>
//         <Thead>
//           <Tr>
//             <Th>Category</Th>
//             <Th>Actions</Th>
//           </Tr>
//           {categories &&
//             categories.length > 0 &&
//             categories.map((cat) => (
//               <Tr key={cat._id}>
//                 <Td>{cat.title}</Td>
//                 <Td>
//                   <IconButton
//                     variant={"link"}
//                     color={"tertiary.dark"}
//                     icon={<RiDeleteBin6Line />}
//                     onClick={() => setCategoryHandler(cat)}
//                   />
//                 </Td>
//               </Tr>
//             ))}
//         </Thead>
//       </Table>
//     </>
//   );
// };

export default CategoriesTable;
