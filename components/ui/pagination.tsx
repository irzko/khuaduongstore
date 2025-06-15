"use client";

import {
  ButtonGroup,
  IconButton,
  type IconButtonProps,
  Pagination,
  usePaginationContext,
  Box,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Link from "next/link";

const PaginationLink = (
  props: IconButtonProps & { page?: "prev" | "next" | number },
) => {
  const { page, ...rest } = props;
  const pagination = usePaginationContext();
  const pageValue = () => {
    if (page === "prev") return pagination.previousPage;
    if (page === "next") return pagination.nextPage;
    return page;
  };
  return (
    <IconButton rounded="full" asChild {...rest}>
      <Link href={`?page=${pageValue()}`}>{props.children}</Link>
    </IconButton>
  );
};

const PaginationBar = ({
  count,
  currentPage,
}: {
  count: number;
  currentPage: number;
}) => {
  return (
    <Box>
      <Pagination.Root
        count={count}
        pageSize={12}
        page={currentPage}
      
      >
        <ButtonGroup variant="ghost">
          <PaginationLink page="prev">
            <HiChevronLeft />
          </PaginationLink>

          <Pagination.Items
            render={(page) => (
              <PaginationLink
                page={page.value}
                variant={{ base: "ghost", _selected: "solid" }}
              >
                {page.value}
              </PaginationLink>
            )}
          />

          <PaginationLink page="next">
            <HiChevronRight />
          </PaginationLink>
        </ButtonGroup>
      </Pagination.Root>
    </Box>
  );
};

export default PaginationBar;
