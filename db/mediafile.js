const DISABLE_SEQUELIZE_DEFAULTS = {
    timestamps: true,
    freezeTableName: true,
  };

const MediaFile = (sequelize,Sequelize) => {
    const {Op,DataTypes} = Sequelize;
    return sequelize.define('MediaFile',{
            id:{
                type: DataTypes.UUID,
                primaryKey:true,
                defaultValue: DataTypes.UUIDV4
            },
            title:{
                type: DataTypes.STRING,
                allowNull:false
            },
            image:{
                type:DataTypes.BLOB('long'),
                allowNull:false
            }
        },{
      ...DISABLE_SEQUELIZE_DEFAULTS
        });
  }
  module.exports = MediaFile;