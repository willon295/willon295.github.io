{% if theme.valine.enable and theme.valine.appid and theme.valine.appkey %}
  <script src="https://cdn1.lncld.net/static/js/3.0.4/av-min.js"></script>
  <script src="https://unpkg.com/valine/dist/Valine.min.js"></script>
  
  <script type="text/javascript">
    new Valine({
		av: AV,
        el: '#comments' ,
        verify: {{ theme.valine.verify }},
        notify: {{ theme.valine.notify }},
        appId: '{{ theme.valine.appid }}',
        appKey: '{{ theme.valine.appkey }}',
		placeholder: '{{ theme.valine.placeholder }}',
        avatar: 'hide',
        guest_info: ['nick'],
        pageSize:'{{ theme.valine.pageSize }}' || 10,
    });
  </script>
{% endif %}
