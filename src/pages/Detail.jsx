import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 根据点击的 ID 显示不同的内容
  const content = {
    shanghai: { title: "上海之行", text: "在外滩吹着晚风，那一刻觉得世界很安静。" },
    wuzhen: { title: "乌镇记忆", text: "蓝印花布很漂亮，你笑得比风景更美。" }
  };

  const item = content[id] || { title: "未知回忆", text: "期待我们去这里！" };

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-btn">← 返回</button>
      <div className="detail-card">
        <h1>{item.title}</h1>
        <div className="photo-placeholder">📸 [这里以后放照片]</div>
        <p className="detail-text">{item.text}</p>
      </div>
    </div>
  );
}
export default Detail;  