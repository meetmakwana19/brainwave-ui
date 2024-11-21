import React, { useRef, useState } from "react";
import {
  InfiniteScrollTable,
  InstructionText,
  Truncate,
  DateLabel,
  Button,
} from "@contentstack/venus-components";
import { useHistory } from "react-router-dom";
import { IMicroAppsObj } from "../../../types/microAppObj";
import './RecentlyModifiedTable.css'

interface ISortBy {
  id: string;
  sortingDirection: string;
}

interface IRecentlyModifiedTableProps {
  microAppsObj: IMicroAppsObj;
}

const RecentlyModifiedTable: React.FC<IRecentlyModifiedTableProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [waveData, setWaveData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [totalCounts, updateTotalCounts] = useState<number>(0);
  const [viewBy, updateViewBy] = useState("Comfort");
  const [showSelected, setShowSelected] = useState(false)
  const [userData, setUserData] = useState<any[]>([])
  // const [didProfileDelete, setDidProfileDelete] = useState(false); // just to track to refresh the table when a profile is deleted
  // const [searchValue, setSearchValue] = useState("");
  const tableInstance = useRef<HTMLDivElement>(null);
  // const { brandKitId } = useParams<IRouteParams>()
  // const dispatch = useDispatch();
  const history = useHistory();
  const path = props.microAppsObj.relativeUrl;

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

  const columns = [
    {
        Header: 'Name',
        id: 'name',
        accessor: (waveData?: any) => {
            if (viewBy === 'Comfort') {
                return (
                    <div className='brain-wave-name' data-test-id='brain-wave-test'>
                        <Truncate
                            isResponsive
                            truncateFrom='end'
                        >
                            {waveData?.name || ""}
                        </Truncate>
                    </div>
                )
            }
            else {
                return null;
            }
        },
        width: 360,
    },
    {
        Header: 'Created By',
        id: 'created_by',
        accessor: (waveData?: any) => {
            if (viewBy === 'Comfort') {
                return (
                    <div className='created-by-description'>
                        <Truncate
                            isResponsive
                            truncateFrom='end'
                        >
                            {waveData?.description || "-"}
                        </Truncate>
                    </div>
                )
            }
            else {
                return null;
            }
        },
        width: 500,
        disableSortBy: true,
    },

    {
        Header: 'Viewed',
        id: 'viewed',
        accessor: (waveData: any,) => {
            if (viewBy === 'Comfort') {
                return (
                    <div>
                        <DateLabel date={waveData?.updated_at} type='large' />
                        <InstructionText className="instruction-text">
                            <Truncate
                                isResponsive={false}
                                truncateFrom='end'
                                maxChar={45}
                            >
                                {
                                    (() => {
                                        const user = userData.find((user) => user.uid === waveData?.viewBy);
                                        return user ? props.microAppsObj.currentUser.uid === user.uid ? "Me" : `${capitalizeFirstLetter(user.firstName)} ${capitalizeFirstLetter(user.lastName)}` : "Unknown User";
                                    })()
                                }
                            </Truncate>
                        </InstructionText>
                    </div>
                )
            }
            else {
                return null;
            }
        },
        width: 250,
    },
]

  const fetchData = async ({
    skip,
    limit,
    searchText,
    sortBy,
  }: {
    skip: number;
    limit: number;
    searchText: string;
    sortBy: ISortBy;
  }) => {
    // fetch data from API
    try {
      // setLoading(true);
      const url = `https://api.example.com/voice-profiles?skip=${skip}&limit=${limit}&searchText=${searchText}&sortBy=${sortBy.id}&sortingDirection=${sortBy.sortingDirection}`;
      const response = await fetch(url);
      const data = await response.json();
      setWaveData(data);
      setLoading(false);
      setSearchValue(searchText || '');
      updateTotalCounts(100);
      setUserData([]);
    } catch (error) {
      console.error("fetchData -- error", error);
    }
  };

  const getViewByValue = (selectedViewBy: string) => {
    updateViewBy(selectedViewBy);
  };

  const searchCaseEmptyObj = {
    heading: "No matching results found!",
    description: (
      <>
        <div>
          Try changing the search query or filters to find what you are looking
          for.
        </div>
      </>
    ),
    forPage: "emptyStateV2",
    moduleIcon: "NoSearchResult",
  };

  const handleNewBrainWaveOnClick = () => {
    history.push(`${path}/create-new-wave`)
  };

  const emptyObj = {
    heading: "No Brain Waves Available",
    description: (
      <>
        <div className="mr-5">
          A brain wave is what brings idea from imagination to reality.
        </div>
        <Button
          aria-label="New Brain Waves"
          data-test-id="cs-brain-wave"
          className="add-brain-wave-icon-button mt-15 mb-15"
          version="v2"
          icon="v2-Plus"
          buttonType="primary"
          size="small"
          onlyIcon={false}
          onClick={handleNewBrainWaveOnClick}
        >
          Create New Wave
        </Button>
      </>
    ),
    forPage: "emptyStateV2",
    moduleIcon: "NoDataEmptyState",
  };

  const onRowSelectProp = [
    {
        label: "Show Selected",
        cb: (): void => {
            setShowSelected(!showSelected)
        },
        icon: showSelected ? '' : 'v2-Eye',
        showSelected: true,
        testId: 'profiles_bulk_action_show_selected'
    },
]

const getRowSelectedProp = () => {
    return onRowSelectProp
}

  const v2FeaturesObj = {
    tableRowAction: true,
    isNewEmptyState: true,
    pagination: true,
    canFreezeCheckbox: false,
  };

  const tableProps = {
    initialSortBy: [{ id: "viewed", desc: true }],
    searchPlaceholder: "Search Brain Waves",
    rowPerPageOptions: [30, 50, 100],
    getViewByValue: getViewByValue,
    fetchTableData: fetchData,
    v2Features: v2FeaturesObj,
    totalCounts: totalCounts,
    minBatchSizeToFetch: 30,
    ref: tableInstance,
    columns: columns,
    loading: loading,
    canRefresh: true,
    canSearch: true,
    uniqueKey: "updated_at",
    data: waveData,
    testid: "test-id-for-IFST",
    emptyObj: searchValue.length > 0 ? searchCaseEmptyObj : emptyObj,
    bulkActionList: getRowSelectedProp,
    // tableRowActionList: onClickHoverActionList,
    // onRowClick: onRowClick,
    isResizable: true,
    columnSelector: false,
  };

  return (
    <>
      <div className="brain-wave-recently-modified">
        <InfiniteScrollTable {...tableProps} />
      </div>
    </>
  );
};

export default RecentlyModifiedTable;
