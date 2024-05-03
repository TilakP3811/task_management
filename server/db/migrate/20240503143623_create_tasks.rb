class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.string :description
      t.integer :status, default: 0, null: false

      t.timestamps
    end
  end
end
