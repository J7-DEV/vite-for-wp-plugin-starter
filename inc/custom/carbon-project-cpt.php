<?php
add_action('init', 'your_prefix_register_post_type');
function your_prefix_register_post_type()
{
  $labels = [
    'name'                     => esc_html__('碳盤查專案', 'your-textdomain'),
    'singular_name'            => esc_html__('碳盤查專案', 'your-textdomain'),
    'add_new'                  => esc_html__('新增', 'your-textdomain'),
    'add_new_item'             => esc_html__('新增', 'your-textdomain'),
    'edit_item'                => esc_html__('編輯', 'your-textdomain'),
    'new_item'                 => esc_html__('新增', 'your-textdomain'),
    'view_item'                => esc_html__('查看', 'your-textdomain'),
    'view_items'               => esc_html__('查看', 'your-textdomain'),
    'search_items'             => esc_html__('搜尋碳盤查專案', 'your-textdomain'),
    'not_found'                => esc_html__('目前沒有專案', 'your-textdomain'),
    'not_found_in_trash'       => esc_html__('目前沒有專案', 'your-textdomain'),
    'parent_item_colon'        => esc_html__('父專案:', 'your-textdomain'),
    'all_items'                => esc_html__('全部', 'your-textdomain'),
    'archives'                 => esc_html__('碳盤查專案列表', 'your-textdomain'),
    'attributes'               => esc_html__('碳盤查專案屬性', 'your-textdomain'),
    'insert_into_item'         => esc_html__('插入碳盤查專案', 'your-textdomain'),
    'uploaded_to_this_item'    => esc_html__('上傳這個碳盤查專案', 'your-textdomain'),
    'featured_image'           => esc_html__('封面圖', 'your-textdomain'),
    'set_featured_image'       => esc_html__('設定封面圖', 'your-textdomain'),
    'remove_featured_image'    => esc_html__('移除封面圖', 'your-textdomain'),
    'use_featured_image'       => esc_html__('用作封面圖', 'your-textdomain'),
    'menu_name'                => esc_html__('碳盤查專案', 'your-textdomain'),
    'filter_items_list'        => esc_html__('篩選碳盤查專案列表', 'your-textdomain'),
    'filter_by_date'           => esc_html__('', 'your-textdomain'),
    'items_list_navigation'    => esc_html__('碳盤查專案列表導航', 'your-textdomain'),
    'items_list'               => esc_html__('碳盤查專案列表', 'your-textdomain'),
    'item_published'           => esc_html__('碳盤查專案已發布', 'your-textdomain'),
    'item_published_privately' => esc_html__('碳盤查專案已私人發布', 'your-textdomain'),
    'item_reverted_to_draft'   => esc_html__('碳盤查專案已回覆為草稿', 'your-textdomain'),
    'item_scheduled'           => esc_html__('碳盤查專案已排程', 'your-textdomain'),
    'item_updated'             => esc_html__('碳盤查專案已更新', 'your-textdomain'),
    'text_domain'              => esc_html__('your-textdomain', 'your-textdomain'),
  ];
  $args = [
    'label'               => esc_html__('碳盤查專案', 'your-textdomain'),
    'labels'              => $labels,
    'description'         => '',
    'public'              => true,
    'hierarchical'        => false,
    'exclude_from_search' => true,
    'publicly_queryable'  => false,
    'show_ui'             => true,
    'show_in_nav_menus'   => false,
    'show_in_admin_bar'   => false,
    'show_in_rest'        => true,
    'query_var'           => false,
    'can_export'          => true,
    'delete_with_user'    => true,
    'has_archive'         => false,
    'rest_base'           => '',
    'show_in_menu'        => true,
    'menu_position'       => 4,
    'menu_icon'           => 'dashicons-chart-area',
    'capability_type'     => 'post',
    'supports'            => ['title', 'editor', 'thumbnail', 'custom-fields', 'author'],
    'taxonomies'          => [],
    'rewrite'             => [
      'with_front' => false,
    ],
  ];

  register_meta('post', 'project_data', [
    'type' => 'string',
    'show_in_rest' => true,
    'single' => true,
  ]);

  register_post_type('carbon-project', $args);
}
