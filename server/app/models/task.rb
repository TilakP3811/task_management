class Task < ApplicationRecord
  PER_PAGE = 10

  validates :title, presence: true
  validate :task_space, on: :create

  scope :ordered, ->(page = 1) { order(created_at: :desc).page(page).per(PER_PAGE) }
  scope :filtered, ->(status = [0, 1, 2]) { where(status: status) }

  state_machine :status, initial: :to_do do
    state :to_do, value: 0
    state :in_progress, value: 1
    state :done, value: 2

    event :start do
      transition to_do: :in_progress
    end

    event :complete do
      transition in_progress: :done
    end
  end

  private

  def task_space
    return if enough_space?

    errors.add(:status, 'ToDo has larger amount of tasks')
  end

  def enough_space?
    return true unless to_do?

    todo_count = Task.with_status(:to_do).count
    total_count = Task.count
    todo_percentage = total_count > 0 ? (todo_count.to_f / total_count) * 100 : 0

    todo_percentage < 50
  end
end
