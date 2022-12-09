import { FC, useEffect, useRef, useState } from 'react'
// import CartoonImage from '../../assets/cartoon.jpg'
// import MovieImage from '../../assets/movie.png'
// import LifeImage from '../../assets/life.jpg'
// import FoodImage from '../../assets/food.jpg'
// import LogoImage from '../../assets/logo.png'
import './index.css'

import styles from './styles.module.scss'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'
import { Button, Form, Input, List, Popup, Space, TextArea } from 'antd-mobile'
import { useStore } from '../../store'
import { observer } from 'mobx-react-lite'

const tabs = [
  {
    key: 'cartoon',
    title: '动画',
    // image: CartoonImage,
  },
  {
    key: 'food',
    title: '美食',
    // image: FoodImage,
  },
  {
    key: 'movie',
    title: '电影',
    // image: MovieImage,
  },
  {
    key: 'life',
    title: '生活',
    // image: LifeImage,
  },
]

const TAB_HEIGHT = 56

// 1. 点击 Tab 滚动跳转 x
// 3. Tabs 吸顶 x
// 2. 滚动时，高亮 Tab x
// 4. 按钮吸底

//使用弹窗

const SecondSection: FC = () => {
  const { taskStore } = useStore()
  const [activeTab, setActiveTab] = useState<string>('cartoon')
  const [isFixed, setIsFixed] = useState<boolean>(false)
  const [visible1, setVisible1] = useState(true)
  const secondSectionRef = useRef<HTMLDivElement>(null)
  //删除
  function delTask(id: number) {
    taskStore.delTask(id)
  }
  //提交后处理
  const onFinish = (values: any) => {
    console.log(values)
    console.log(values.address)
    console.log(values.name + '的墓地')
    taskStore.addTask({
      id: uuid(),
      name: values.name + '的墓地',
      address: values.address,
    })
  }
  const activate = (key: string) => {
    setActiveTab(key)

    const tabContentEl = document.querySelector(`[data-id=${key}]`)

    if (tabContentEl) {
      tabContentEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const onScroll = () => {
    if (secondSectionRef.current) {
      const { top } = secondSectionRef.current.getBoundingClientRect()
      setIsFixed(top <= 0)

      const sectionNodes = secondSectionRef.current.querySelectorAll('section')

      Array.from(sectionNodes).forEach((sectionEl) => {
        const { top } = sectionEl.getBoundingClientRect()
        const key = sectionEl.getAttribute('data-id') || ''

        if (top <= TAB_HEIGHT) {
          setActiveTab(key)
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return (
    <div className={styles.secondSection} ref={secondSectionRef}>
      {/* Tabs */}
      <ul className={classNames({ [styles.isFixed]: isFixed })}>
        {taskStore.list.map((item) => (
          <li key={item.id} onClick={() => activate(item.name)}>
            <span>{item.name}</span>
            <span
              className={classNames(styles.line, {
                [styles.visible]: activeTab === item.name,
              })}
            />
          </li>
        ))}
      </ul>
      {/* <ul className={classNames({ [styles.isFixed]: isFixed })}>
        {tabs.map((tab) => (
          <li key={tab.key} onClick={() => activate(tab.key)}>
            <span>{tab.title}</span>
            <span
              className={classNames(styles.line, {
                [styles.visible]: activeTab === tab.key,
              })}
            />
          </li>
        ))}
      </ul> */}

      {/* 类名标识 */}
      <List header="墓碑列表">
        {taskStore.list.map((item) => (
          <section data-id={item.id}>
            <List.Item
              extra={
                <Button
                  color="primary"
                  onClick={() => delTask(item.id)}
                  //区分了一下当要传出网页中该结构的状态时比如checked的状态，要传e
                  //而如果仅仅时想传对象的状态什么的，应传item.
                >
                  删除
                </Button>
              }>
              {item.address}
              {item.name}
              <img src="src/assets/food.jpg" alt="#" />
            </List.Item>
          </section>
          // <li className="todo" >
          //   <div className="view">
          //     <label>{item.name}</label>
          //     <label>{item.address}</label>
          //   </div>
          // </li>
        ))}
      </List>
      {/* <div>
        {taskStore.list.map((item) => (
          <section data-id={.key}>
            <h2>{tab.title}</h2>
            <img src={tab.image} alt={tab.key} />
          </section>
        ))}
      </div> */}

      {/* 吸底按钮 */}
      <div
        className={classNames(styles.btnWrapper, {
          [styles.visible]: isFixed,
        })}>
        {/* <img src={LogoImage} alt="LOGO" /> */}
        {/* 弹出层按钮 */}
        <Button
          onClick={() => {
            setVisible1(true)
          }}>
          展开第一个弹出层
        </Button>
        {/* 弹出层 */}
        <Popup
          visible={visible1}
          onMaskClick={() => {
            setVisible1(false)
          }}
          bodyStyle={{ height: '60vh' }}>
          <div style={{ padding: '24px' }}>
            <Space direction="vertical">
              <div>这是弹出层1</div>
              <Form
                onFinish={onFinish}
                layout="horizontal"
                footer={
                  <Button block type="submit" color="primary" size="large">
                    提交
                  </Button>
                }>
                <Form.Header>水平布局表单</Form.Header>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: '姓名不能为空' }]}>
                  <Input onChange={console.log} placeholder="请输入姓名" />
                </Form.Item>
                <Form.Item name="address" label="地址" help="详情地址">
                  <TextArea
                    placeholder="请输入地址"
                    maxLength={100}
                    rows={2}
                    showCount
                  />
                </Form.Item>
              </Form>
            </Space>
          </div>
        </Popup>
      </div>
    </div>
  )
}

export default observer(SecondSection)
