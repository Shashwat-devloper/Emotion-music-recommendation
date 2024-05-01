import React from "react";
import { Table } from "antd";
import PlaylistLink from "./PlaylistLink";
import PlaylistCover from "./PlaylistCover";

const tableCols = [
  {
    title: "Playlist Cover",
    dataIndex: "images",
    key: "images",
    align: "center",
    render: (imagesArr) => <PlaylistCover imagesArr={imagesArr} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    ellipsis: true,
  },
  {
    title: "Playlist Link",
    dataIndex: "external_urls",
    key: "external_urls",
    align: "center",
    ellipsis: true,
    render: (urlObj) => <PlaylistLink urlObj={urlObj} />,
  },
];

const SpotifyPlaylistTable = ({ playlists }) => {
  return (
    <div className="spotifyPlaylistTable-wrapper">
      <Table
        columns={tableCols}
        dataSource={playlists}
        scroll={{ y: 400 }}
        pagination={false}
        bordered={true}
        size="middle"
      />
    </div>
  );
};

export default SpotifyPlaylistTable;
