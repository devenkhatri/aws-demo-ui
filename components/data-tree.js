import { Tree, message, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { FolderTwoTone, FileTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;


const DataTree = () => {
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    message.info(`Selected: ${info?.node?.title}`)
  };

  const handleClick = (e) => {
    console.log('Clicked: ', e);
    message.info(`Clicked: ${e?.key}`)
  }
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      onClick={handleClick}
    >
      <SubMenu key="sub1" icon={<FolderTwoTone />} title="Folder - 1">
        <Menu.Item key="Option1" icon={<FileTwoTone />}>Option1</Menu.Item>
        <Menu.Item key="Option2" icon={<FileTwoTone />}>Option2</Menu.Item>
        <Menu.Item key="Option3" icon={<FileTwoTone />}>Option3</Menu.Item>
        <Menu.Item key="Option4" icon={<FileTwoTone />}>Option4</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<FolderTwoTone />} title="Folder - 2">
        <Menu.Item key="Option5" icon={<FileTwoTone />}>Option5</Menu.Item>
        <Menu.Item key="Option6" icon={<FileTwoTone />}>Option6</Menu.Item>
        <Menu.Item key="Option7" icon={<FileTwoTone />}>Option7</Menu.Item>
        <Menu.Item key="Option8" icon={<FileTwoTone />}>Option8</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" icon={<FolderTwoTone />} title="Folder - 3">
        <Menu.Item key="Option9" icon={<FileTwoTone />}>Option9</Menu.Item>
        <Menu.Item key="Option10" icon={<FileTwoTone />}>Option10</Menu.Item>
        <Menu.Item key="Option11" icon={<FileTwoTone />}>Option11</Menu.Item>
        <Menu.Item key="Option12" icon={<FileTwoTone />}>Option12</Menu.Item>
      </SubMenu>
    </Menu>
    // <Tree
    //     showLine
    //     switcherIcon={<DownOutlined />}
    //     defaultExpandedKeys={['0-0-0']}
    //     onSelect={onSelect}
    //     treeData={[
    //       {
    //         title: 'parent 1',
    //         key: '0-0',
    //         children: [
    //           {
    //             title: 'parent 1-0',
    //             key: '0-0-0',
    //             children: [
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-0-0',
    //               },
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-0-1',
    //               },
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-0-2',
    //               },
    //             ],
    //           },
    //           {
    //             title: 'parent 1-1',
    //             key: '0-0-1',
    //             children: [
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-1-0',
    //               },
    //             ],
    //           },
    //           {
    //             title: 'parent 1-2',
    //             key: '0-0-2',
    //             children: [
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-2-0',
    //               },
    //               {
    //                 title: 'leaf',
    //                 key: '0-0-2-1',
    //               },
    //             ],
    //           },
    //         ],
    //       },
    //     ]}
    //   />
  );
}

export default DataTree;