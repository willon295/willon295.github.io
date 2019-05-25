---
title: '[SpringMVC]Mock接口测试'
category: SpringMVC
tag: Mock
date: 2019-05-22 00:00:00
---



如何简单的构建一个接口测试, 直接使用单测


```java
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@RunWith(SpringRunner.class)
public class MockMvcTest {

    
    private MockMvc mockMvc;

    @Resource
    WebApplicationContext webApplicationContext;

    @Before
    public void init() {
        // 初始化mockMvc
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }


    @Test
    public void testGet() throws Exception {

        MvcResult result = mockMvc
                .perform(
                        get("/student")
                                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        String content = result.getResponse().getContentAsString();
    }

    @Test
    public void testPost() throws Exception {
        Academy academy = new Academy() {{
            setName("外国语学院");
            setCode("wgy0001");
            setRemark("...");
        }};
        mockMvc.perform(
		// 这里是请求的接口URL
                post("/academy")
			// 具体请求参数和内容
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(JSON.toJSONString(academy)))

                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("ok"))
                .andReturn();
    }

}

```